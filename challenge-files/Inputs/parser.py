import re
import csv

# slot, port, ont_id (identificador a ONU no endereço), sn e status (online e off-line)
def readHuawei(path):
    file = open(path, "r")
    data = file.read()
    data = data[data.find("0/"):]
    data = data[:data.find("-")]
    split_data = data.split("\n")
    split_data.pop()
    ONUList = []

    for data_chunk in split_data:
        data_chunk = data_chunk.lstrip()
        ONUInfo = re.split(r" {2,}", data_chunk)
        ONUList.append({"slot":ONUInfo[0].split("/")[1], "port":ONUInfo[0].split("/")[2], "ont_id": ONUInfo[1], "sn": ONUInfo[2], "isonline": 0 if ONUInfo[4] == "offline" else 1, "olt": "Huawei"})
        #print({"slot":ONUInfo[0].split("/")[1], "port":ONUInfo[0].split("/")[2], "ont_id": ONUInfo[1], "sn": ONUInfo[2], "status": ONUInfo[4]})
    return ONUList

def readZTE(pathSN, pathSNState):
    file = open(pathSN, "r")
    data = file.read()
    split_data = data.split("\n")
    split_data.pop(0)
    split_data.pop(0)
    split_data.pop()

    SNList = []
    for data_chunk in split_data:
        ONUInfo = re.split(r" {2,}", data_chunk)
        SNList.append(ONUInfo[3].replace("SN:", ""))

    file = open(pathSNState, "r")
    data = file.read()
    split_data = data.split("\n")
    split_data.pop(0)
    split_data.pop(0)
    split_data.pop(0)
    split_data.pop()
    split_data.pop()

    ONUList = []
    for i, data_chunk in enumerate(split_data):
        ONUInfo = re.split(r" {2,}", data_chunk)
        ONUList.append({"slot": ONUInfo[0].split("/")[0], "port": ONUInfo[0].split("/")[1], "ont_id": ONUInfo[0].split(":")[1], "sn": SNList[i], "isonline": 0 if ONUInfo[3] == "working" else 1, "olt": "ZTE"})
        #print({"slot": ONUInfo[0].split("/")[0], "port": ONUInfo[0].split("/")[1], "ont_id": ONUInfo[0].split(":")[1], "sn": SNList[i], "status": "online" if ONUInfo[3] == "working" else "offline"})
    return ONUList

huawei = readHuawei("./challenge-files/Inputs/OntInfo - Huawei.txt")
zte = readZTE("./challenge-files/Inputs/OntInfo - ZTE - SNs.txt", "./challenge-files/Inputs/OntInfo - ZTE - SNs - State.txt")


with open('./docker/olts.csv', 'w', newline='') as file:
    field_names = ["sn", "slot", "port", "ont_id", "isonline", "olt"]
    writer = csv.DictWriter(file, field_names)
    writer.writeheader()
    writer.writerows(huawei)
    writer.writerows(zte)

#with open('./docker/olts_huawei.csv', 'w', newline='') as file:
#    writer = csv.DictWriter(file, field_names)
#    writer.writeheader()
#    writer.writerows(huawei)

#with open('./backend/src/olts_zte.csv', 'w', newline='') as file:
#    writer = csv.DictWriter(file, field_names)
#    writer.writeheader()
#    writer.writerows(zte)