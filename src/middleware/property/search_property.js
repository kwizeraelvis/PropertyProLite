import { results, SUCCESS, ERROR } from '../../helper/result';
import { pool } from '../../startup/pg_db';
import { CREATE_USER_TABLE, CREATE_PROPERTY_TABLE } from '../../db/query';

export default async (req, res, next) => {
    const keys = Object.keys(req.query);

    await pool.query(CREATE_USER_TABLE);
    await pool.query(CREATE_PROPERTY_TABLE);
    const { rows: specificProperties } = await pool.query(`SELECT * FROM properties WHERE type = '${req.query.type}'`);

    if (keys.length > 0) {
        if(specificProperties.length > 0) return res.send(results(200, SUCCESS, specificProperties));
       
        return res.status(404).send(results(404, ERROR, 'Properties with the given type cannot be found'));
    }

    next();
}