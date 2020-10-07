import { File, Accedration, Offer, Pathway, Provider, DataField, Generic, Industry, Bannerfile, Setting } from '@/models';
import { includes } from 'lodash';
var multer = require('multer')
var fs = require('fs')
var multerS3 = require('multer-s3')
const aws = require('aws-sdk');
const s3Storage = require('multer-sharp-s3');
const express = require('express');
const router = express.Router();

aws.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_ACCESS
})
const s3 = new aws.S3()
const Storage = s3Storage({
  s3,
  Bucket: process.env.S3_BUCKET,
  ACL: 'public-read',
});

export default class Controller {

  constructor({ app, prefix, finale }) {
    this.fileResource = finale.resource({
      model: File,
      endpoints: [prefix, `${prefix}/:id`],
    });

    router.post('/generate_presigned_url', this.generatePresignedUrl);

    router.post('/upload_pdf_file', this.uploadallfile);

    router.post('/addPdfData', this.addPdfData);

    router.get('/get_pdf_data/:user_id/:user_role', this.getPdfData);

    router.post('/add_accedration', this.addAccedration);

    router.post('/add_industry', this.addIndustry);

    router.post('/add_generic', this.addGenric);

    router.post('/add_banner_files', this.addBannerFiles);

    router.post('/get_accedration', this.getAccedration);

    router.post('/get_industry', this.getIndustry);

    router.post('/get_images_list', this.getBannerFiles);

    router.get('/get_banner_list/:page_id', this.getBannerFilesList);

    router.post('/get_generic_types', this.getGenericTypes);

    router.post('/upadte_show_status', this.updateAdminShowdata);

    router.post('/get_generic', this.getGeneric);

    router.post('/delete_pdf', this.deletePdf);

    router.post('/offer_delete_pdf', this.offerdeletePdf);

    router.get('/get_accedration/:id/', this.getImagesData);

    router.post('/upload_multiple_file', this.uploaMultipleFile);

    router.post('/upload_single_file', this.uploadSingleFile);

    router.get('/get_provider/:id/', this.getProvider);

    router.post('/delete_provider', this.deleteProvider);

    router.post('/delete_pathway', this.deletePathway);

    router.post('/delete_offer', this.deleteOffer);

    router.post('/update_topic', this.updateTopic);

    router.post('/update_topic_route', this.updateTopicRoute);

    router.post('/delete_topic_route', this.deleteTopicRoute);

    router.post('/update_promo_route', this.updatePromoRoute);

    router.post('/delete_promo_route', this.deletePromoRoute);

    router.post('/delete_topic', this.deleteTopic);

    router.post('/add_page', this.addPage);

    router.post('/get_page', this.getPage);

    router.post('/get_custom_route_page', this.getCustomPageRoute);


    app.use(prefix, router);

  }

  getCustomPageRoute(req, res) {
    // console.log("-------------", req.params)
    const page_route = req.body.page_route;
    if (!page_route) {
      return res.status(404).send({
        message: 'Please send the valid params',
      });
    } else {
      Setting.findAll({
        where: {
          page_route: page_route,
        },
      }).then(response => {
        return res.status(200).json({
          status: true,
          message: 'Pages listing data',
          data: response
        });
      }).catch(err => {
        return res.status(404).json({
          message: 'Somethig Went Wrong',
          error: err
        })
      })
    }
  }

  addPage(req, res) {
    const { page_route, user_role, user_id } = req.body
    console.log("---------", req.body)
    if (!page_route) {
      return res.status(404).send({
        message: 'Please send the valid params',
      });
    } else {
      Setting.create({
        page_route: page_route,
        user_role: user_role,
        user_id: user_id
      }).then(response => {
        return res.status(200).json({
          status: true,
          message: 'Data save successfully...',
          data: response
        })
      })
    }
  }

  getPage(req, res) {
    // console.log("-------------", req.params)
    // const user_id = req.params.user_id;
    // const user_role = req.params.user_role;

    // if (!user_id) {
    //   return res.status(404).send({
    //     message: 'Please send the valid params',
    //   });
    // } else {
    Setting.findAll({
      // where: {
      //   user_id: user_id,
      //   user_role: user_role,
      // },
    }).then(response => {
      return res.status(200).json({
        status: true,
        message: 'Pages listing data',
        data: response
      });
    }).catch(err => {
      return res.status(404).json({
        message: 'Somethig Went Wrong',
        error: err
      })
    })
    // }
  }

  deleteTopic(req, res) {
    console.log("-------------", req.body)
    const user_id = req.body.user_id;
    const page_url_check = req.body.page_url_check

    if (!user_id) {
      return res.status(404).send({
        message: 'Please send the valid params',
      });
    } else {
      DataField.update({ is_check_topic: false }, { where: { id: user_id } }).then(response => {
        return res.status(200).json({
          status: true,
          message: 'Data update succesfully',
          data: response
        });
      }).catch(err => {
        return res.status(404).json({
          message: 'Somethig Went Wrong',
          error: err
        })
      })
    }
  }

  updateTopic(req, res) {
    console.log("-------------", req.body)
    const user_id = req.body.user_id;
    const page_url_check = req.body.page_url_check

    if (!user_id) {
      return res.status(404).send({
        message: 'Please send the valid params',
      });
    } else {
      DataField.update({ is_check_topic: true }, { where: { id: user_id } }).then(response => {
        return res.status(200).json({
          status: true,
          message: 'Data update succesfully',
          data: response
        });
      }).catch(err => {
        return res.status(404).json({
          message: 'Somethig Went Wrong',
          error: err
        })
      })
    }
  }

  async updateTopicRoute(req, res) {
    console.log("-------------", req.body)
    const user_id = req.body.user_id;
    const page_url_check = req.body.page_url_check
    const page_id = req.body.page_id
    if (!user_id) {
      return res.status(404).send({
        message: 'Please send the valid params',
      });
    } else {
      let pageData
      let idData
      await DataField.findAll({ where: { id: user_id } }).then(async response => {
        // console.log("resp",response)
        let testing = response.map(item => {
          pageData = !item.dataValues.page_url_check.includes(page_url_check) && item.dataValues.page_url_check.push(page_url_check)
          idData = !item.dataValues.page_id.includes(page_id) && item.dataValues.page_id.push(page_id)
          return item
        })
        // console.log("resp", testing[0].dataValues)
        await testing.map(async item => {
          let final = await DataField.update({ page_url_check: item.page_url_check, page_id: item.page_id }, { where: { id: item.id } })
          return item
        })
        // console.log("finalaaa",response)
        return res.status(200).json({
          status: true,
          message: 'Data update succesfully',
          data: response
        });
      }).catch(err => {
        return res.status(404).json({
          message: 'Somethig Went Wrong',
          error: err
        })
      })
    }
  }

  async deleteTopicRoute(req, res) {
    console.log("-------------", req.body)
    const user_id = req.body.user_id;
    const page_url_check = req.body.page_url_check
    const page_id = req.body.page_id
    if (!user_id) {
      return res.status(404).send({
        message: 'Please send the valid params',
      });
    } else {
      let pageData
      let idData
      await DataField.findAll({ where: { id: user_id } }).then(async response => {
        await response.map(async item => {
          console.log("resp", item.dataValues)
          item.dataValues.page_id = item.dataValues.page_id.filter(val => !page_id.includes(val));
        })
        await response.map(async item => {
          // console.log("finalllllllllllllllllllls", item.dataValues.page_id)
          let final = await DataField.update({ page_id: item.dataValues.page_id }, { where: { id: item.id } })
          return item
        })
        // console.log("finalaaa",response)
        return res.status(200).json({
          status: true,
          message: 'Data update succesfully',
          data: response
        });
      }).catch(err => {
        return res.status(404).json({
          message: 'Somethig Went Wrong',
          error: err
        })
      })
    }
  }

  async deletePromoRoute(req, res) {
    console.log("-------------", req.body)
    const type = req.body.type
    const user_id = req.body.user_id;
    const custom_page_promo_ids = req.body.custom_page_promo_ids
    const custom_page_local_ids = req.body.custom_page_local_ids
    const custom_page_promo_routes = req.body.custom_page_promo_routes
    const page_id = req.body.page_id
    if (!user_id) {
      return res.status(404).send({
        message: 'Please send the valid params',
      });
    }
    if (type === "offer") {
      let promoId,
        localId, promo_route
      await Offer.findAll({ where: { id: user_id } }).then(async response => {
        // console.log("22222222222",response)
         await response.map(async item => {
          console.log("resp", item.dataValues)
          item.dataValues.custom_page_promo_ids =  item.dataValues.custom_page_promo_ids.filter(val => !custom_page_promo_ids.includes(val));
          item.dataValues.custom_page_local_ids =  item.dataValues.custom_page_local_ids.filter(val => !custom_page_local_ids.includes(val));
          item.dataValues.custom_page_promo_routes =  item.dataValues.custom_page_promo_routes.filter(val => !custom_page_promo_routes.includes(val));

        })
        // console.log("testing", response)
        await response.map(async item => {
          console.log("qqqqqqqqqqqqqq", item.dataValues)
          let final = await Offer.update({ custom_page_promo_ids: item.dataValues.custom_page_promo_ids, custom_page_local_ids: item.dataValues.custom_page_local_ids, custom_page_promo_routes: item.dataValues.custom_page_promo_routes }, { where: { id: item.id } })
          return item
        })
        // console.log("finalaaa",response)
        return res.status(200).json({
          status: true,
          message: 'Data update succesfully',
          data: response
        });
      }).catch(err => {
        return res.status(404).json({
          message: 'Somethig Went Wrong',
          error: err
        })
      })
    } else if (type === "provider") {
      let promoId,
        localId, promo_route
      await Provider.findAll({ where: { id: user_id } }).then(async response => {
        // console.log("22222222222",response)
         await response.map(async item => {
          item.dataValues.custom_page_promo_ids =  item.dataValues.custom_page_promo_ids.filter(val => !custom_page_promo_ids.includes(val));
          item.dataValues.custom_page_local_ids =  item.dataValues.custom_page_local_ids.filter(val => !custom_page_local_ids.includes(val));
          item.dataValues.custom_page_promo_routes =  item.dataValues.custom_page_promo_routes.filter(val => !custom_page_promo_routes.includes(val));
        })
        // console.log("testing", response)
        await response.map(async item => {
          // console.log("qqqqqqqqqqqqqq", item)
          let final = await Provider.update({custom_page_promo_ids: item.dataValues.custom_page_promo_ids, custom_page_local_ids: item.dataValues.custom_page_local_ids, custom_page_promo_routes: item.dataValues.custom_page_promo_routes }, { where: { id: item.id } })
          return item
        })
        // console.log("finalaaa",response)
        return res.status(200).json({
          status: true,
          message: 'Data update succesfully',
          data: response
        });
      }).catch(err => {
        return res.status(404).json({
          message: 'Somethig Went Wrong',
          error: err
        })
      })
    } else if (type === "pathway") {
      let promoId,
        localId, promo_route
      await Pathway.findAll({ where: { id: user_id } }).then(async response => {
        // console.log("22222222222",response)
        await response.map(async item => {
          item.dataValues.custom_page_promo_ids =  item.dataValues.custom_page_promo_ids.filter(val => !custom_page_promo_ids.includes(val));
          item.dataValues.custom_page_local_ids =  item.dataValues.custom_page_local_ids.filter(val => !custom_page_local_ids.includes(val));
          item.dataValues.custom_page_promo_routes =  item.dataValues.custom_page_promo_routes.filter(val => !custom_page_promo_routes.includes(val));
        })
        // console.log("testing", response)
        await response.map(async item => {
          // console.log("qqqqqqqqqqqqqq", item)
          let final = await Pathway.update({ custom_page_promo_ids: item.dataValues.custom_page_promo_ids, custom_page_local_ids: item.dataValues.custom_page_local_ids, custom_page_promo_routes: item.dataValues.custom_page_promo_routes }, { where: { id: item.id } })
          return item
        })
        // console.log("finalaaa",response)
        return res.status(200).json({
          status: true,
          message: 'Data update succesfully',
          data: response
        });
      }).catch(err => {
        return res.status(404).json({
          message: 'Somethig Went Wrong',
          error: err
        })
      })
    }
  }

  async updatePromoRoute(req, res) {
    console.log("-------------", req.body)
    const type = req.body.type
    const user_id = req.body.user_id;
    const custom_page_promo_ids = req.body.custom_page_promo_ids
    const custom_page_local_ids = req.body.custom_page_local_ids
    const custom_page_promo_routes = req.body.custom_page_promo_routes
    const page_id = req.body.page_id
    if (!user_id) {
      return res.status(404).send({
        message: 'Please send the valid params',
      });
    }
    if (type === "offer") {
      let promoId,
        localId, promo_route
      await Offer.findAll({ where: { id: user_id } }).then(async response => {
        // console.log("22222222222",response)
        let testing = await response.map(async item => {
          promoId = await custom_page_promo_ids !== null && !item.dataValues.custom_page_promo_ids.includes(custom_page_promo_ids) && item.dataValues.custom_page_promo_ids.push(custom_page_promo_ids)
          localId = await custom_page_local_ids !== null && !item.dataValues.custom_page_local_ids.includes(custom_page_local_ids) && item.dataValues.custom_page_local_ids.push(custom_page_local_ids)
          promo_route = await custom_page_promo_routes !== null && !item.dataValues.custom_page_promo_routes.includes(custom_page_promo_routes) && item.dataValues.custom_page_promo_routes.push(custom_page_promo_routes)
          return item
        })
        console.log("testing", response)
        await response.map(async item => {
          // console.log("qqqqqqqqqqqqqq", item)
          let final = await Offer.update({ custom_page_promo_ids: item.custom_page_promo_ids, custom_page_local_ids: item.custom_page_local_ids, custom_page_promo_routes: item.custom_page_promo_routes }, { where: { id: item.id } })
          return item
        })
        // console.log("finalaaa",response)
        return res.status(200).json({
          status: true,
          message: 'Data update succesfully',
          data: response
        });
      }).catch(err => {
        return res.status(404).json({
          message: 'Somethig Went Wrong',
          error: err
        })
      })
    } else if (type === "provider") {
      let promoId,
        localId, promo_route
      await Provider.findAll({ where: { id: user_id } }).then(async response => {
        // console.log("22222222222",response)
        let testing = await response.map(async item => {
          promoId = await custom_page_promo_ids !== null && !item.dataValues.custom_page_promo_ids.includes(custom_page_promo_ids) && item.dataValues.custom_page_promo_ids.push(custom_page_promo_ids)
          localId = await custom_page_local_ids !== null && !item.dataValues.custom_page_local_ids.includes(custom_page_local_ids) && item.dataValues.custom_page_local_ids.push(custom_page_local_ids)
          promo_route = await custom_page_promo_routes !== null && !item.dataValues.custom_page_promo_routes.includes(custom_page_promo_routes) && item.dataValues.custom_page_promo_routes.push(custom_page_promo_routes)
          return item
        })
        console.log("testing", response)
        await response.map(async item => {
          // console.log("qqqqqqqqqqqqqq", item)
          let final = await Provider.update({ custom_page_promo_ids: item.custom_page_promo_ids, custom_page_local_ids: item.custom_page_local_ids, custom_page_promo_routes: item.custom_page_promo_routes }, { where: { id: item.id } })
          return item
        })
        // console.log("finalaaa",response)
        return res.status(200).json({
          status: true,
          message: 'Data update succesfully',
          data: response
        });
      }).catch(err => {
        return res.status(404).json({
          message: 'Somethig Went Wrong',
          error: err
        })
      })
    } else if (type === "pathway") {
      let promoId,
        localId, promo_route
      await Pathway.findAll({ where: { id: user_id } }).then(async response => {
        // console.log("22222222222",response)
        let testing = await response.map(async item => {
          promoId = await custom_page_promo_ids !== null && !item.dataValues.custom_page_promo_ids.includes(custom_page_promo_ids) && item.dataValues.custom_page_promo_ids.push(custom_page_promo_ids)
          localId = await custom_page_local_ids !== null && !item.dataValues.custom_page_local_ids.includes(custom_page_local_ids) && item.dataValues.custom_page_local_ids.push(custom_page_local_ids)
          promo_route = await custom_page_promo_routes !== null && !item.dataValues.custom_page_promo_routes.includes(custom_page_promo_routes) && item.dataValues.custom_page_promo_routes.push(custom_page_promo_routes)
          return item
        })
        console.log("testing", response)
        await response.map(async item => {
          // console.log("qqqqqqqqqqqqqq", item)
          let final = await Pathway.update({ custom_page_promo_ids: item.custom_page_promo_ids, custom_page_local_ids: item.custom_page_local_ids, custom_page_promo_routes: item.custom_page_promo_routes }, { where: { id: item.id } })
          return item
        })
        // console.log("finalaaa",response)
        return res.status(200).json({
          status: true,
          message: 'Data update succesfully',
          data: response
        });
      }).catch(err => {
        return res.status(404).json({
          message: 'Somethig Went Wrong',
          error: err
        })
      })
    }
  }

  deletePathway(req, res) {
    console.log("-------------", req.body)
    const user_id = req.body.user_id;

    if (!user_id) {
      return res.status(404).send({
        message: 'Please send the valid params',
      });
    } else {
      Pathway.destroy({
        where: {
          id: user_id,
        },
      }).then(response => {
        console.log("daaaa", response)
        return res.status(200).json({
          status: true,
          message: 'Pathway data deleted succesfully',
          data: response
        });
      }).catch(err => {
        return res.status(404).json({
          message: 'Somethig Went Wrong',
          error: err
        })
      })
    }
  }

  deleteProvider(req, res) {
    console.log("-------------", req.body)
    const user_id = req.body.user_id;

    if (!user_id) {
      return res.status(404).send({
        message: 'Please send the valid params',
      });
    } else {
      Provider.destroy({
        where: {
          id: user_id,
        },
      }).then(response => {
        console.log("data", response)
        return res.status(200).json({
          status: true,
          message: 'Provider data deleted succesfully',
          data: response
        });
      }).catch(err => {
        return res.status(404).json({
          message: 'Somethig Went Wrong',
          error: err
        })
      })
    }
  }

  deleteOffer(req, res) {
    console.log("-------------", req.body)
    const user_id = req.body.user_id;

    if (!user_id) {
      return res.status(404).send({
        message: 'Please send the valid params',
      });
    } else {
      Offer.destroy({
        where: {
          id: user_id,
        },
      }).then(response => {
        return res.status(200).json({
          status: true,
          message: 'Offer data deleted succesfully',
          data: response
        });
      }).catch(err => {
        return res.status(404).json({
          message: 'Somethig Went Wrong',
          error: err
        })
      })
    }
  }

  getProvider(req, res) {
    console.log("-------------", req.params)
    const user_id = req.params.id;

    if (!user_id) {
      return res.status(404).send({
        message: 'Please send the valid params',
      });
    } else {
      Provider.findOne({
        where: {
          id: user_id,
        },
      }).then(response => {
        return res.status(200).json({
          status: true,
          message: 'Provider listing data',
          data: response
        });
      }).catch(err => {
        return res.status(404).json({
          message: 'Somethig Went Wrong',
          error: err
        })
      })
    }
  }

  getImagesData(req, res) {
    console.log("-------------", req.params)
    const user_id = req.params.id;

    if (!user_id) {
      return res.status(404).send({
        message: 'Please send the valid params',
      });
    } else {
      Pathway.findOne({
        where: {
          id: user_id,
        },
      }).then(response => {
        return res.status(200).json({
          status: true,
          message: 'Pathway listing data',
          data: response
        });
      }).catch(err => {
        return res.status(404).json({
          message: 'Somethig Went Wrong',
          error: err
        })
      })
    }
  }

  async offerdeletePdf(req, res) {
    const { image, user_id } = req.body
    console.log("======", req.body)
    await Offer.findOne({ where: { id: user_id } }).then(async resp => {
      if (resp.dataValues.rubric_attachment) {
        let Arr = []
        await resp.dataValues.rubric_attachment.map(async (item, i) => {
          let newData = JSON.parse(item)
          await Arr.push(newData)
          console.log("newwwwwwww", newData.original, image)
          if (newData.original === image) {
            console.log(i, "1111111111")
            Arr = await Arr.splice(i, 1)
          }
        })
        console.log("11111111111111============", Arr)
        await Offer.update({ rubric_attachment: Arr }, {
          where: {
            id: user_id,
          },
          returning: true,
          plain: true
        }).then(response => {
          console.log("responseeeeeee", response)
          return res.status(200).json({
            status: true,
            message: 'Data Update succesffuly',
            data: response
          });
        }).then(error => {
          return res.status(404).json({
            message: 'Something went wrong',
            error: error
          })
        })
      }
    }).catch(err => {
      res.status(404).json({
        message: 'Something went wrong',
        error: err
      })
    })
  }

  async deletePdf(req, res) {
    const { image, user_id } = req.body
    console.log("======", req.body)
    await Pathway.findOne({ where: { id: user_id } }).then(async resp => {
      if (resp.dataValues.rubric_attachment) {
        console.log("resp.dataValues.rubric_attachment", resp.dataValues.rubric_attachment)
        let Arr = []
        await resp.dataValues.rubric_attachment.map(async (item, i) => {
          let newData = JSON.parse(item)
          await Arr.push(newData)
          console.log("newwwwwwww", newData.original, image)
          if (newData.original === image) {
            console.log(i, "1111111111")
            Arr = await Arr.splice(i, 1)
          }
        })
        console.log("11111111111111============", Arr)
        await Pathway.update({ rubric_attachment: Arr }, {
          where: {
            id: user_id,
          },
          returning: true,
          plain: true
        }).then(response => {
          console.log("responseeeeeee", response)
          return res.status(200).json({
            status: true,
            message: 'Data Update succesffuly',
            data: response
          });
        }).then(error => {
          return res.status(404).json({
            message: 'Something went wrong',
            error: error
          })
        })
      }
    }).catch(err => {
      res.status(404).json({
        message: 'Something went wrong',
        error: err
      })
    })
  }

  getGeneric(req, res) {
    console.log("-------------", req)
    Offer.findAll({
      where: {
        is_generic: true,
      },
    }).then(response => {
      return res.status(200).json({
        status: true,
        message: 'Genric listing data',
        data: response
      });
    }).catch(err => {
      return res.status(404).json({
        message: 'Somethig Went Wrong',
        error: err
      })
    })
  }

  updateAdminShowdata(req, res) {
    const { user_id, is_display } = req.body
    console.log("---------", req.body)
    if (!user_id) {
      return res.status(404).send({
        message: 'Please send the valid params',
      });
    } else {
      Offer.update({ is_display: is_display }, {
        where: {
          id: user_id,
        }, returning: true,
        plain: true
      }).then(resp => {
        // console.log("--------------", resp)
        return res.status(200).json({
          status: true,
          message: 'Data Update Successfully...',
          data: resp
        })
      }).catch(error => {
        return res.status(404).json({
          message: 'Somethig Went Wrong',
          error: error
        })
      })
    }
  }

  addIndustry(req, res) {
    const { name, user_role, user_id } = req.body
    console.log("---------", req.body)
    if (!name) {
      return res.status(404).send({
        message: 'Please send the valid params',
      });
    } else {
      Industry.create({
        name: name,
        user_role: user_role,
        user_id: user_id
      }).then(response => {
        return res.status(200).json({
          status: true,
          message: 'data save successfully...',
          data: response
        })
      })
    }
  }

  addAccedration(req, res) {
    const { name, user_role, user_id } = req.body
    console.log("---------", req.body)
    if (!name) {
      return res.status(404).send({
        message: 'Please send the valid params',
      });
    } else {
      Accedration.create({
        name: name,
        user_role: user_role,
        user_id: user_id
      }).then(response => {
        return res.status(200).json({
          status: true,
          message: 'Accedration data save successfully...',
          data: response
        })
      })
    }
  }


  addGenric(req, res) {
    const { name, user_role, user_id } = req.body
    console.log("---------", req.body)
    if (!name) {
      return res.status(404).send({
        message: 'Please send the valid params',
      });
    } else {
      Generic.create({
        name: name,
        user_role: user_role,
        user_id: user_id
      }).then(response => {
        return res.status(200).json({
          status: true,
          message: 'Genric data save successfully...',
          data: response
        })
      })
    }
  }


  addBannerFiles(req, res) {
    const { landing_image, user_role, user_id, image_url, page_url_check, page_id } = req.body
    console.log("---------", req.body)
    if (!landing_image) {
      return res.status(404).send({
        message: 'Please send the valid params',
      });
    } else {
      Bannerfile.create({
        landing_image: landing_image,
        user_role: user_role,
        user_id: user_id,
        image_url: image_url,
        page_url_check: page_url_check,
        page_id: page_id
      }).then(response => {
        return res.status(200).json({
          status: true,
          message: 'Data save successfully...',
          data: response
        })
      })
    }
  }

  getBannerFiles(req, res) {
    console.log("-------------")
    Bannerfile.findAll({}).then(response => {
      return res.status(200).json({
        status: true,
        message: 'Banner listing data',
        data: response
      });
    }).catch(err => {
      return res.status(404).json({
        message: 'Somethig Went Wrong',
        error: err
      })
    })
    // }
  }

  getBannerFilesList(req, res) {
    console.log("-------------", req.params)
    const page_id = req.params.page_id;
    // const user_role = req.params.user_role;

    if (!page_id) {
      return res.status(404).send({
        message: 'Please send the valid params',
      });
    } else {
      Bannerfile.findAll({
        where: {
          page_id: page_id,
          // user_role: user_role,
        },
      }).then(response => {
        return res.status(200).json({
          status: true,
          message: 'Banner listing data',
          data: response
        });
      }).catch(err => {
        return res.status(404).json({
          message: 'Somethig Went Wrong',
          error: err
        })
      })
    }
  }

  getAccedration(req, res) {
    // console.log("-------------", req.params)
    // const user_id = req.params.user_id;
    // const user_role = req.params.user_role;

    // if (!user_id) {
    //   return res.status(404).send({
    //     message: 'Please send the valid params',
    //   });
    // } else {
    Accedration.findAll({
      // where: {
      //   user_id: user_id,
      //   user_role: user_role,
      // },
    }).then(response => {
      return res.status(200).json({
        status: true,
        message: 'Accedration listing data',
        data: response
      });
    }).catch(err => {
      return res.status(404).json({
        message: 'Somethig Went Wrong',
        error: err
      })
    })
    // }
  }
  getIndustry(req, res) {
    // console.log("-------------", req.params)
    // const user_id = req.params.user_id;
    // const user_role = req.params.user_role;

    // if (!user_id) {
    //   return res.status(404).send({
    //     message: 'Please send the valid params',
    //   });
    // } else {
    Industry.findAll({
      // where: {
      //   user_id: user_id,
      //   user_role: user_role,
      // },
    }).then(response => {
      return res.status(200).json({
        status: true,
        message: 'Industry listing data',
        data: response
      });
    }).catch(err => {
      return res.status(404).json({
        message: 'Somethig Went Wrong',
        error: err
      })
    })
    // }
  }

  getGenericTypes(req, res) {
    // console.log("-------------", req.params)
    // const user_id = req.params.user_id;
    // const user_role = req.params.user_role;

    // if (!user_id) {
    //   return res.status(404).send({
    //     message: 'Please send the valid params',
    //   });
    // } else {
    Generic.findAll({
      // where: {
      //   user_id: user_id,
      //   user_role: user_role,
      // },
    }).then(response => {
      return res.status(200).json({
        status: true,
        message: 'Generic listing data',
        data: response
      });
    }).catch(err => {
      return res.status(404).json({
        message: 'Somethig Went Wrong',
        error: err
      })
    })
    // }
  }

  addPdfData(req, res) {
    const { pdf_link, user_id, user_role } = req.body
    console.log("---------", req.body)
    if (!pdf_link) {
      return res.status(404).send({
        message: 'Please send the valid params',
      });
    } else {
      File.create({
        pdf_link: pdf_link,
        user_id: user_id,
        user_role: user_role
      }).then(response => {
        return res.status(200).json({
          status: true,
          message: 'pdf data save successfully...',
          data: response
        })
      })
    }
  }

  getPdfData(req, res) {
    console.log("-------------", req.params)
    const user_id = req.params.user_id;
    const user_role = req.params.user_role;

    if (!user_id) {
      return res.status(404).send({
        message: 'Please send the valid params',
      });
    } else {
      File.findAll({
        where: {
          user_id: user_id,
          user_role: user_role,
        },
      }).then(response => {
        return res.status(200).json({
          status: true,
          message: 'pdf data save successfully...',
          data: response
        });
      }).catch(err => {
        return res.status(404).json({
          message: 'Somethig Went Wrong',
          error: err
        })
      })
    }
  }

  generatePresignedUrl(req, res) {
    const { name } = req.body;
    if (!name) {
      return res.status(404).send({
        message: 'File name is empty.',
      });
    }

    return res.status(200).send({
      url: File.generatePresignedUrl(name),
    });
  }

  async uploadallfile(req, res, next) {
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type, Accept,Authorization,Origin");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Credentials", true);
    var upload = await multer(
      {
        storage: Storage
      }
    ).array('files', 10);
    upload(req, res, function (err) {
      console.log("req.files", req.files)
      let obj = {}
      let data1 = []
      req.files.map((item) => {
        obj['original'] = item.Location,
          obj['name'] = item.originalname
        data1.push(obj);
        obj = {}
      })
      console.log("dataaaaaaaaaa", data1)
      if (data1.length) {
        res.status(200).json({
          status: true,
          message: 'File uploaded successfully',
          data: data1,
        })
      } else {
        res.status(400).json({ error: "Something went wrong" });
      }
    });
  }

  async uploaMultipleFile(req, res, next) {
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type, Accept,Authorization,Origin");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Credentials", true);
    var upload = await multer(
      {
        storage: Storage
      }
    ).array('files', 10);
    upload(req, res, function (err) {
      console.log("req.files", req.files)
      let obj = {}
      let data1 = []
      req.files.map((item) => {
        obj['original'] = item.Location,
          obj['name'] = item.originalname
        data1.push(obj);
        obj = {}
      })
      console.log("dataaaaaaaaaa", data1)
      if (data1.length) {
        res.status(200).json({
          status: true,
          message: 'File uploaded successfully',
          data: data1,
        })
      } else {
        res.status(400).json({ error: "Something went wrong" });
      }
    });
  }

  async uploadSingleFile(req, res, next) {
    var upload = await multer(
      {
        storage: Storage
      }
    ).array('files', 1);
    upload(req, res, function (err) {
      console.log("req.files", req.files)
      let obj = {}
      let data1 = []
      req.files.map((item) => {
        obj['original'] = item.Location,
          obj['name'] = item.originalname
        data1.push(obj);
        obj = {}
      })
      console.log("dataaaaaaaaaa", data1)
      if (data1.length) {
        res.status(200).json({
          status: true,
          message: 'File uploaded successfully',
          data: data1,
        })
      } else {
        res.status(400).json({ error: "Something went wrong" });
      }
    });
  }
}


