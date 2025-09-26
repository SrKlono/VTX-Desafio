import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import api from "./lib/axios.js";

const App = () => {
	const [olts, setOlts] = useState([]);

	useEffect(() => {
		const fetcholts = async () => {
			try {
				const res = await api.get();
				console.log(res.data);
				setOlts(res.data);
			} catch (error) {
				console.error("Error fetching olt list: ", error);
			}
		};

		fetcholts();
	}, []);

	return (
		<div className="min-h-screen flex flex-col justify-center items-center bg-gray-800">

      <h1 className="text-5xl font-bold pt-16">Virtex - ONUs</h1>
			<table className="table-auto border-collapse m-28">
				<thead>
					<tr className="[&>*]:py-3 [&>*]:px-12 [&>*]:border [&>*]:border-gray-400/40 bg-gray-600 text-gray-100">
						<th>sn</th>
						<th>slot</th>
						<th>port</th>
						<th>ont_id</th>
						<th>status</th>
						<th>vendor</th>
					</tr>
				</thead>
				<tbody>
					{olts.length > 0 &&
						olts.map((olt) => (
							<tr className="[&>*]:py-3 [&>*]:px-12 [&>*]:border [&>*]:border-gray-500/40 text-center [&>*]:bg-gray-700 text-gray-300">
								<td>{olt.sn}</td>
								<td>{olt.slot}</td>
								<td>{olt.port}</td>
								<td>{olt.ont_id}</td>
								<td className={olt.isonline ? "text-green-300": "text-red-400"}>{olt.isonline ? "online" : "offline"}</td>
								<td>{olt.olt_vendor}</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	);
};

export default App;
