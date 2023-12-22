import React from "react";
import "./Log.css";
import { Button, Form, Input, message, Select, Upload, ConfigProvider, theme, Layout, InputNumber, Space } from "antd";
import Papa from "papaparse";
import { BsFillInboxesFill } from "react-icons/bs";
import { DownloadOutlined } from "@ant-design/icons";


interface Props {
    log: string[];
    setLog: (x: string[] | null) => void;
}

const unparseConfig: Papa.UnparseConfig = {
    quotes: false, //or array of booleans
    quoteChar: "\"",
    escapeChar: "",
    delimiter: ",",
    header: false,
    newline: "\n",
    skipEmptyLines: false, //other option is 'greedy', meaning skip delimiters, quotes, and whitespace.
    // columns: null //or array of strings
};

function downloadFile(csvArray: string[]) {
    let array: any = [];
    for (const line of csvArray) {
        if (line.includes("***")) {
            array.push([line]);
        } else {
            array[array.length-1].push(line);
        }
    }
    array = array[0].map((val: string, index: number) => array.map((row: any) => row[index]));


    // const csv = JSON.stringify(array);
    const csv = Papa.unparse(array, unparseConfig);

    const blob = new Blob([csv], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = `${new Date().toDateString()}.csv`;
    link.href = url; 
    link.click();
    URL.revokeObjectURL(url);
}

export default function Log({log, setLog}: Props) {
    return (
        <div id="log">
            <Button
                type="primary"
                // className="w-full bg-[#1b1ba0] mt-4 disabled:bg-[#ccc]"
                htmlType="submit"
                // disabled={!csv}
                style={{width: "3em", position: "absolute", left: "1em", top: "1em"}}
                onClick={() => downloadFile(log)}
                icon={<DownloadOutlined />}
            >
                
            </Button>
            <h1 className="report">REPORT</h1>
            <Button
                type="primary"
                // className="w-full bg-[#1b1ba0] mt-4 disabled:bg-[#ccc]"
                htmlType="submit"
                // disabled={!csv}
                style={{width: "3em", backgroundColor: "#dd0000", position: "absolute", right: "1em", top: "1em"}}
                onClick={() => setLog(null)}
            >
            X
            </Button>
            
            {log.map((log, i) => <p key={i}>{log}</p>)}
        </div>
    );
}
