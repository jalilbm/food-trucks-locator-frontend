import React from "react";
import { Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { TruckData, DestinationsTableProps } from "../../types";

const columns: ColumnsType<TruckData> = [
	{
		title: "Applicant",
		dataIndex: "applicant",
		key: "applicant",
		render: (text) => <p>{text}</p>,
	},
	{
		title: "Address",
		dataIndex: "address",
		key: "address",
	},
	{
		title: "Food Items",
		dataIndex: "foodItems",
		key: "foodItems",
	},
	{
		title: "Distance",
		dataIndex: "distance",
		key: "distance",
	},
	{
		title: "Duration",
		dataIndex: "duration",
		key: "duration",
	},
	{
		title: "Open",
		key: "openNow",
		dataIndex: "openNow",
		render: (openNow) => (
			<Tag color={openNow === true ? "green" : "volcano"}>
				{openNow === true ? "True" : "Unknown"}
			</Tag>
		),
	},
];

const DestinationsTable: React.FC<DestinationsTableProps> = ({
	trucksData,
}) => {
	return (
		<Table
			columns={columns}
			dataSource={trucksData}
			scroll={{ x: 900 }}
			pagination={false}
		/>
	);
};

export default DestinationsTable;
