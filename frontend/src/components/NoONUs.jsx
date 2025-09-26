import React from "react";
import api from "../lib/axios.js";

const NoONUs = () => {
	return (
		<button
			onClick={() => {
				const importData = async () => {
					try {
						const res = await api.post();
                        location.reload();
						console.log(res.data);
					} catch (error) {
						console.error("Error fetching onu list: ", error);
					}
				};

				importData();
			}}
			className="my-12 rounded-2xl p-6 text-2xl text-gray-100 border font-semibold border-gray-500/70 transition-all hover:scale-110 hover:bg-gray-600 bg-gray-700"
		>
			INSERIR DADOS
		</button>
	);
};

export default NoONUs;
