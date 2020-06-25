import * as express from 'express';
import {
  Student,
  Enrollment,
  StudentPathway,
  Pathway,
  File,
  DataField,
  Provider,
  Offer,
} from '@/models';

const router = express.Router();

export default class Controller {
  constructor({ app, prefix, finale }) {
    this.userResource = finale.resource({
      model: Student,
      endpoints: [prefix, `${prefix}/:id`],
    });

    router.put(
      '/:student_id/offers/:offer_id/provider/:provider_id/enroll',
      async (req, res, next) => {
        let { student_id, offer_id, provider_id } = req.params;
        const { start_date } = req.body;
        student_id = Number(student_id);
        offer_id = Number(offer_id);

        if (provider_id) {
          provider_id = Number(provider_id);
        }

        let defaultParams = {
          student_id,
          offer_id,
          provider_id,
        };

        if (!provider_id) {
          defaultParams = {
            student_id,
            offer_id,
          };
        }

        const existingEnrollment = await Enrollment.findOne({
          where: defaultParams,
        });

        if (existingEnrollment) {
          return res.status(200).send('Student already enrolled');
        }

        const createdEnrollment = await Enrollment.create({
          ...defaultParams,
          status: 'Inactivate',
          start_date,
        });
        return res.status(201).send(createdEnrollment);
      },
    );

    router.post(
      '/:student_id/pathways/:pathway_id/enroll',
      async (req, res, next) => {
        let { student_id, pathway_id } = req.params;
        student_id = Number(student_id);
        pathway_id = Number(pathway_id);

        const studentPathway = await StudentPathway.findOne({
          where: {
            student_id,
            pathway_id,
          },
        });

        if (studentPathway) {
          return res.status(200).send(studentPathway);
        }

        const newStudentPathway = await StudentPathway.create({
          student_id,
          pathway_id,
        });

        return res.status(201).send(newStudentPathway);
      },
    );

    router.put('/:student_id/pathways/:pathway_id', async (req, res, next) => {
      let { student_id, pathway_id } = req.params;
      student_id = Number(student_id);
      pathway_id = Number(pathway_id);

      const { notes } = req.body;

      const studentPathway = await StudentPathway.findOne({
        where: {
          student_id,
          pathway_id,
        },
      });

      studentPathway.notes = notes;
      await studentPathway.save();
      const pathway = await Pathway.findByPk(studentPathway.pathway_id, {
        include: [
          { model: File },
          { model: DataField },
          { model: Provider },
          {
            model: Student,
            as: 'StudentsPathways',
          },
          {
            model: Offer,
            as: 'GroupsOfOffers',
          },
        ],
      });

      return res.status(200).send(pathway);
    });

    app.use(prefix, router);
  }
}
