import mysql from "mysql2/promise";
import dotenv from "dotenv";
import { parse } from "csv-parse";
import path from "path";
import fs from "fs";

const __dirname = path.resolve();

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
		const [rows] = await pool.query("SELECT * FROM olts");
		res.status(200).json(rows);
	} catch (error) {
		console.error("Error in getOlts", error);
		res.status(500).json({ message: "Internal server error" });
	}
}

export async function insertOlts(req, res) {
	try {
		const olts = [];
		const parser = fs.createReadStream(`${__dirname}/src/olts.csv`).pipe(
			parse({
				delimiter: [","],
				columns: false,
				cast: false,
				from_line: 2
			})
		);
		for await (const olt of parser) {
			olts.push(olt);
		}

		var response = await pool.query(
			"INSERT IGNORE INTO olts (sn, slot, port, ont_id, isonline, olt_vendor) VALUES ?",
			[olts]
		);

		res.status(200).json(response);
	} catch (error) {
		console.error("Error in insertOlt", error);
		res.status(500).json({ message: "Internal server error" });
	}
}
