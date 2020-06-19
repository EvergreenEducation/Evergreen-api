import {
  Pathway, Provider, DataField, Enrollment,
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

    const statuses = [];
    const semesterSet = new Set();
    const currentYear = new moment().year();

    let maxYear = 4;
    for (const _op of offersPathways) {
      const { status } = await OfferService.checkStudentEnrollStatus(
        student_id,
        _op.offer_id,
      );

      const year = currentYear + _op.year - 1;

      if (_op.year && _op.year > maxYear) {
        maxYear = _op.year;
      }

      statuses.push({
        status,
        semester: _op.semester,
        year,
      });

      semesterSet.add(`${_op.semester}-${year}`);
    }

    for (let i = 0; i < maxYear; i += 1) {
      semesterSet.add(`fall-${currentYear + i + 1}`);
      semesterSet.add(`winter-${currentYear + i + 1}`);
      semesterSet.add(`spring-${currentYear + i + 1}`);
      semesterSet.add(`summer-${currentYear + i + 1}`);
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
      const { status } = enr;
      const year = new moment(enr.start_date || enr.createdAt).year();
      const month = new moment(enr.start_date || enr.createdAt).month();

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

      statuses.push({
        status,
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

    for (const status of STATUSES) {
      const statusObj = {
        label: inAppLabels[status],
        backgroundColor: backgroundColors[status],
      };

      const data = [];

      for (const entry of semesters) {
        let [semester, year] = entry.split('-');
        year = Number(year);
        const checkStatus = filter(statuses, {
          semester,
          status,
          year,
        });
        data.push(checkStatus.length);
      }

      statusObj.data = data;
      datasets.push(statusObj);
    }

    const labels = semesters.map(s => {
      const [sem, year] = s.split('-');
      return `${sem.charAt(0)}-${year.slice(-2)}`;
    });

    return res.status(200).send({ labels, datasets });
  }
}
