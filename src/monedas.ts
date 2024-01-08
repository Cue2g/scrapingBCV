
import mongoose from "mongoose";

export interface Imonedas {
    euro: Number,
    yuan: Number,
    lira: Number,
    rublo: Number,
    dolar: Number,
    fecha: Date
}
const Schema = mongoose.Schema;

const MonedasSchema = new Schema<Imonedas>({
    euro: Number,
    yuan: Number,
    lira: Number,
    rublo: Number,
    dolar: Number,
    fecha: Date
  });

const Monedas = mongoose.model('registers', MonedasSchema);

export default Monedas;
