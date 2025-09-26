import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import api from "./lib/axios.js";
import NoONUs from "./components/NoONUs.jsx";

const App = () => {
	const [ONUs, setONUs] = useState([]);
	const fetchONUs = async () => {
		try {
			const res = await api.get();
			console.log(res.data);
			setONUs(res.data);
		} catch (error) {
			console.error("Error fetching onu list: ", error);
		}
	};

	useEffect(() => {
		fetchONUs();
	}, []);

	return (
		<div className="min-h-screen flex flex-col justify-center items-center bg-red-950">
			<h1 className="text-5xl font-bold pt-16">Virtex - ONUs</h1>

			{ONUs.length === 0 && <NoONUs fetchFunc={fetchONUs} />}
			{ONUs.length > 0 && (
				<table className="table-auto border-collapse m-28">
					<thead>
						<tr className="[&>*]:py-3 [&>*]:px-12 [&>*]:border [&>*]:border-red-400/40 bg-red-800 text-red-100">
							<th>sn</th>
							<th>slot</th>
							<th>port</th>
							<th>ont_id</th>
							<th>status</th>
							<th>vendor</th>
						</tr>
					</thead>
					<tbody>
						{ONUs.map((onu) => (
							<tr key={onu.sn} className="[&>*]:py-3 [&>*]:px-12 [&>*]:border [&>*]:border-red-500/40 text-center [&>*]:bg-red-900 text-red-200">
								<td>{onu.sn}</td>
								<td>{onu.slot}</td>
								<td>{onu.port}</td>
								<td>{onu.ont_id}</td>
								<td
									className={
										onu.isonline
											? "text-green-300"
											: "text-black/70"
									}
								>
									{onu.isonline ? "online" : "offline"}
								</td>
								<td>{onu.olt_vendor}</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
};

export default App;
