import request from 'request-promise'
import { load } from 'cheerio'
import Monedas from './monedas'



export default async function scraping() {
    try {
        
        const $ = await request({
            uri: 'http://www.bcv.org.ve/',
            "rejectUnauthorized": false,
            transform: body => load(body)
        })


        const euro = Number($('#euro').find('strong').html().replace(',', '.'));
        const yuan = Number($('#yuan').find('strong').html().replace(',', '.'));
        const lira = Number($('#lira').find('strong').html().replace(',', '.'));
        const rublo = Number($('#rublo').find('strong').html().replace(',', '.'));
        const dolar = Number($('#dolar').find('strong').html().replace(',', '.'));

        const data = {
            euro,
            yuan,
            lira,
            rublo,
            dolar,
            fecha: Date.now()
        }

        const doc = await Monedas.find().sort({$natural:-1}).limit(1).select({_id:0, __v:0});

        const currenciesToUpdate:Array<keyof typeof data> = ['euro', 'yuan', 'lira', 'rublo', 'dolar'];
        if (currenciesToUpdate.some(currency => doc[0][currency] !== data[currency])) {
            await Monedas.create(data);
            console.log('update');
          } else {
            console.log('Nothing to update');
          }
    } catch (error) {
        console.log(error)
    }
}