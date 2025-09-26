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
	database: "onusdb",
	port: process.env.MYSQL_PORT,
});

export async function getOnus(req, res) {
	try {
		const [rows] = await pool.query("SELECT * FROM onus");
		res.status(200).json(rows);
	} catch (error) {
		console.error("Error in getOnus", error);
		res.status(500).json({ message: "Internal server error" });
	}
}

export async function insertOnus(req, res) {
	try {
		const onus = [];
		const parser = fs.createReadStream(`${__dirname}/src/onus.csv`).pipe(
			parse({
				delimiter: [","],
				columns: false,
				cast: false,
				from_line: 2
			})
		);
		for await (const onu of parser) {
			onus.push(onu);
		}

		var response = await pool.query(
			"INSERT IGNORE INTO onus (sn, slot, port, ont_id, isonline, olt_vendor) VALUES ?",
			[onus]
		);

		res.status(200).json(response);
	} catch (error) {
		console.error("Error in insertOnu", error);
		res.status(500).json({ message: "Internal server error" });
	}
}
