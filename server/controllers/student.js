import * as express from 'express';
import { Student, Enrollment, StudentPathway } from '@/models';

const router = express.Router();

export default class Controller {
  constructor({ app, prefix, finale }) {
    this.userResource = finale.resource({
      model: Student,
      endpoints: [prefix, `${prefix}/:id`],
    });

    router.put(
      '/:student_id/offers/:offer_id/enroll',
      async (req, res, next) => {
        let { student_id, offer_id } = req.params;
        student_id = Number(student_id);
        offer_id = Number(offer_id);

        const enrollmentResource = await Enrollment.findOne({
          where: {
            student_id: null,
            offer_id,
            status: 'Inactivate',
          },
        });

        if (!enrollmentResource) {
          return res.status(400).send({
            message: 'There are no activatable enrollments available.',
          });
        }

        const updatedEnrollment = await enrollmentResource.update({
          student_id,
          status: 'Activated',
        });

        return res.status(200).send(updatedEnrollment);
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

    app.use(prefix, router);
  }
}
