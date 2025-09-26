import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
	host: "localhost",
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: "oltsdb",
	port: process.env.MYSQL_PORT,
});

export async function getOlts(req, res) {
	try {
		const [rows] = await pool.query('SELECT * FROM olts');
		res.status(200).json(rows);
	} catch (error) {
		console.error("Error in getOlts", error);
		res.status(500).json({ message: "Internal server error" });
	}
}

export async function insertOlt(req, res) {
    try {
        
    } catch (error) {
        console.error("Error in insertOlt", error);
		res.status(500).json({ message: "Internal server error" });
    }
}
