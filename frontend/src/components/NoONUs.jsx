import React from "react";
import api from "../lib/axios.js";

const NoONUs = ({fetchFunc}) => {
	return (
		<button
			onClick={() => {
				const importData = async () => {
					try {
						const res = await api.post();
						console.log(res.data);
                        fetchFunc();
					} catch (error) {
						console.error(
							"Error inserting onu into database: ",
							error
						);
					}
				};

				importData();
			}}
			className="my-12 rounded-2xl p-6 text-2xl text-red-100 border font-semibold border-red-500/70 transition-transform hover:scale-110 bg-red-700"
		>
			INSERIR DADOS
		</button>
	);
};

export default NoONUs;
