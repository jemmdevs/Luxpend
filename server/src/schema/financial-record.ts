import mongoose from "mongoose";

interface FinancialRecord {
  userId: string;
  date: Date;
  description: string;
  amount: number;
  category: string;
  paymentMethod: string;
}

const financialRecordSchema = new mongoose.Schema<FinancialRecord>({
  userId: { type: String, required: true },
  date: { type: Date, required: true, default: Date.now },
  description: { type: String, required: true },
  amount: { 
    type: Number, 
    required: true,
    validate: {
      validator: function(value: number) {
        return !isNaN(value) && isFinite(value);
      },
      message: 'El monto debe ser un número válido'
    }
  },
  category: { type: String, required: true },
  paymentMethod: { type: String, required: true },
});

const FinancialRecordModel = mongoose.model<FinancialRecord>(
  "FinancialRecord",
  financialRecordSchema
);

export default FinancialRecordModel;