import {
  Pathway, Provider, DataField, Enrollment, Offer,
} from '@/models';
import { compact, filter, map } from 'lodash';
import DataFieldService from '@/services/datafield';
import SequelizeHelperService from '@/services/sequelize-helper';
import PathwayService from '@/services/pathway';
import OfferService from '@/services/offer';
import Sequelize from 'sequelize';
import moment from 'moment';

const { Op } = Sequelize;

const express = require('express');

const router = express.Router();

export default class Controller {
  constructor({ app, prefix, finale }) {
    this.pathwayResource = finale.resource({
      model: Pathway,
      endpoints: [prefix, `${prefix}/:id`],
      include: [
        { model: Provider, attributes: ['id', 'name', 'location'] },
        { model: DataField },
      ],
    });

    this.pathwayResource.create.write_after(async (req, res, context) => {
      const { topics = [], groups_of_offers = [] } = req.body;

      const datafields = compact([...topics]);

      const {
        includeLoadInstruction: datafieldsLoad,
      } = await DataFieldService.addToModel(
        context.instance,
        datafields,
        'pathways_datafields',
        'pathway_id',
      );

      const {
        includeLoadInstruction: groupsLoad,
      } = await PathwayService.connectGroupsOfOffers(
        context.instance,
        groups_of_offers,
      );

      context.instance = await SequelizeHelperService.load(context.instance, [
        datafieldsLoad,
        groupsLoad,
      ]);

      return context.continue;
    });

    this.pathwayResource.create.send_before(async (req, res, context) => {
      context.instance.dataValues.GroupsOfOffers = await PathwayService.loadOffersPathways(
        context.instance,
      );

      return context.continue;
    });

    this.pathwayResource.list.send_before(async (req, res, context) => {
      for (const pathway of context.instance) {
        pathway.dataValues.GroupsOfOffers = await PathwayService.loadOffersPathways(
          pathway,
        );
      }

      return context.continue;
    });

    this.pathwayResource.read.send_before(async (req, res, context) => {
      context.instance.dataValues.GroupsOfOffers = await PathwayService.loadOffersPathways(
        context.instance,
      );

      return context.continue;
    });

    this.pathwayResource.update.write_after(async (req, res, context) => {
      const { topics: newTopics = [], groups_of_offers } = req.body;

      const datafields = compact([...newTopics]);

      const {
        includeLoadInstruction: groupsLoad,
      } = await PathwayService.connectGroupsOfOffers(
        context.instance,
        groups_of_offers,
      );

      const {
        includeLoadInstruction: datafieldsLoad,
      } = await DataFieldService.addToModel(
        context.instance,
        datafields,
        'pathways_datafields',
        'pathway_id',
      );
      context.instance = await SequelizeHelperService.load(context.instance, [
        datafieldsLoad,
        groupsLoad,
      ]);

      return context.continue;
    });

    this.pathwayResource.update.send_before(async (req, res, context) => {
      context.instance.dataValues.GroupsOfOffers = await PathwayService.loadOffersPathways(
        context.instance,
      );

      return context.continue;
    });

    router.post(
      '/generate_userpathway_chart_data',
      this.generateUserPathwayChartData,
    );

    app.use(prefix, router);
  }

  async generateUserPathwayChartData(req, res) {
    const { student_id, pathway_id, group_name } = req.body;

    const pathway = await Pathway.findByPk(pathway_id);

    let offersPathways = await PathwayService.loadOffersPathways(pathway);

    if (group_name) {
      offersPathways = offersPathways.filter(v => v.group_name === group_name);
    }

    for (let k = 0; k < offersPathways.length; k += 1) {
      const offer = await Offer.findByPk(offersPathways[k].offer_id);
      offersPathways[k].offer = offer;
    }

    const statuses = [];
    const semesterSet = new Set();
    const currentYear = new moment().year();

    let maxYear = 4;
    for (const _op of offersPathways) {
      let { status } = await OfferService.checkStudentEnrollStatus(
        student_id,
        _op.offer_id,
      );

      const year = currentYear + _op.year - 1;

      if (_op.year && _op.year > maxYear) {
        maxYear = _op.year;
      }

      if (status === 'Activated') {
        status = 'Approved';
      }

      statuses.push({
        status,
        semester: _op.semester,
        year,
        offer_name: _op.offer.name,
      });

      semesterSet.add(`${_op.semester}-${year}`);
    }

    for (let i = 0; i <= maxYear; i += 1) {
      semesterSet.add(`fall-${currentYear + i}`);
      semesterSet.add(`winter-${currentYear + i}`);
      semesterSet.add(`spring-${currentYear + i}`);
      semesterSet.add(`summer-${currentYear + i}`);
    }

    const offersInPathway = map(offersPathways, 'offer_id');

    // these are the enrollment of offers that is not in the pathway
    const standAloneEnrollments = await Enrollment.findAll({
      where: {
        student_id,
        offer_id: {
          [Op.notIn]: offersInPathway,
        },
      },
    });

    for (const enr of standAloneEnrollments) {
      let { status } = enr;
      const year = new moment(enr.start_date || enr.createdAt).year();
      const month = new moment(enr.start_date || enr.createdAt).month();

      const offer = await Offer.findByPk(enr.offer_id);

      let semester = null;
      if (month >= 1 && month < 4) {
        semester = 'spring';
      } else if (month >= 4 && month < 8) {
        semester = 'summer';
      } else if (month >= 8 && month < 10) {
        semester = 'fall';
      } else {
        semester = 'winter';
      }

      if (status === 'Activated') {
        status = 'Approved';
      }

      statuses.push({
        status,
        offer_name: offer.name,
        semester,
        year,
      });

      semesterSet.add(`${semester}-${year}`);
    }

    const { STATUSES } = Enrollment;

    const datasets = [];

    const backgroundColors = {
      Inactivate: 'rgb(148,0,211)',
      Activated: 'rgb(0,0,255)',
      Completed: 'rgb(0,255,0)',
      Approved: 'rgb(0,0,255)',
      Unenrolled: 'rgba(255,255,0,0.2)',
      Failed: 'rgb(255,99,132)',
    };

    const inAppLabels = {
      Inactivate: 'Applied',
      Activated: 'Enrolled',
      Completed: 'Passed',
      Approved: 'Enrolled',
      Unenrolled: 'Unenrolled',
      Failed: 'Failed',
    };

    const semesters = Array.from(semesterSet).sort((a, b) => {
      const [semesterA, yearA] = a.split('-');
      const [semesterB, yearB] = b.split('-');
      return yearA - yearB;
    });

    const dataLookUp = {};

    for (const status of STATUSES) {
      const statusObj = {
        label: inAppLabels[status],
        backgroundColor: backgroundColors[status],
        barPercentage: 0.6,
        categoryPerentage: 0.6,
      };

      const data = [];

      for (let i = 0; i < semesters.length; i += 1) {
        const entry = semesters[i];
        let [semester, year] = entry.split('-');
        year = Number(year);
        const checkStatus = filter(statuses, {
          semester,
          status,
          year,
        });

        if (checkStatus.length) {
          const key = `${semester.substring(0, 2)}-${year
            .toString()
            .slice(-2)}-${inAppLabels[status]}`;

          if (!dataLookUp[key]) {
            dataLookUp[key] = [];
          }
          dataLookUp[key].push(...map(checkStatus, 'offer_name'));
        }
        data.push(checkStatus.length);
      }

      statusObj.data = data;
      datasets.push(statusObj);
    }

    const labels = semesters.map(s => {
      const [sem, year] = s.split('-');
      return `${sem.substring(0, 2)}-${year.slice(-2)}`;
    });

    return res.status(200).send({
      labels, datasets, dataLookUp, statuses,
    });
  }
}
