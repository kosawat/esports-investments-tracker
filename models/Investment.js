const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InvestmentSchema = new Schema(
  {
    date: {
      type: Date,
    },
    investmenttype: {
      type: String,
    },
    sector: [{ type: String }],
    amount: {
      type: Number,
    },
    investee: {
      type: String,
      required: true,
    },
    investor: [
      {
        type: String,
        require: true,
      },
    ],
  },
  { timestamps: true }
);

module.exports = Investment = mongoose.model('investment', InvestmentSchema);
