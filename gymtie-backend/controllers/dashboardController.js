let moment = require("moment");
let models = require("../model");
let _ = require("lodash");

getStats = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let numberOfMembers = await models.Member.find({
        gym: req?.admin?.gym,
        isListed: true,
      }).countDocuments();

      let earningsMonthly = 0;
      let earningsYearly = 0;

      let payments = await models.Payment.find({
        gym: req?.admin?.gym,
        isListed: true,
      });
      payments?.map((payment) => {
        console.log(moment(payment?.paymentDate).isSame(new Date(), "date"));
        if (moment(payment?.paymentDate).isSame(new Date(), "year")) {
          earningsYearly += payment?.amount;
        }
        if (moment(payment?.paymentDate).isSame(new Date(), "month")) {
          earningsMonthly += payment?.amount;
        }
      });

      resolve({
        status: 200,
        data: {
          numberOfMembers: numberOfMembers,
          earningsMonthly: earningsMonthly,
          earningsAnnual: earningsYearly,
        },
      });
    } catch (err) {
      reject({
        status: 200,
        message: err.message,
      });
    }
  });
};

module.exports = {
  getStats,
};
