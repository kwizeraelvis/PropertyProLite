import { properties } from '../../helper/property';
import { results, ERROR } from '../../helper/result';
import { pool } from '../../startup/pg_db';
import { CREATE_PROPERTY_TABLE } from '../../db/query';

export default async (req, res, next) => {
    await pool.query(CREATE_PROPERTY_TABLE);

    if(isNaN(req.params.id)) return res.status(400).send(results(400, ERROR, 'If you are trying to pass an id, please use a number'));
    
    const { rows: property } = await pool.query(`SELECT * FROM properties WHERE id = ${req.params.id} `);
     if (property.length === 0) return res.status(404).send(results(404, ERROR, 'Property with the given id does not exists'));

    req.property = property[0];

    next();
}