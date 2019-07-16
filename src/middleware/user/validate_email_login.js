import { users } from '../../helper/user';
import { results, ERROR } from '../../helper/result';
import { pool } from '../../startup/pg_db';
import { SELECT_USER, CREATE_USER_TABLE } from '../../db/query';

export default async (req, res, next) => {
    await pool.query(CREATE_USER_TABLE);
    const user = await pool.query(SELECT_USER, [req.body.email]);
    if (user.rows.length === 0) return res.status(400).send(results(400, ERROR, 'Invalid email'));

    req.user = user.rows[0];

    next();
}