import React, { useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useState } from "react";
import CollapsibleTable from "./CollapsibleTable";

const { NeuralNetwork } = require("@nlpjs/neural");
const corpus = require("./corpus.json");
ChartJS.register(ArcElement, Tooltip, Legend);

const Classification = ({ fileArray }) => {
  const [total, setTotal] = useState({
    tperso: { duration: 0, occurence: 0 },
    culturel: { duration: 0, occurence: 0 },
    sortie: { duration: 0, occurence: 0 },
    obligation: { duration: 0, occurence: 0 },
    association: { duration: 0, occurence: 0 },
    transport: { duration: 0, occurence: 0 },
    unknown: { duration: 0, occurence: 0 },
  });
  const [totalArray, setTotalArray] = useState([
    {
      name: "Travail personnel",
      duration: 0,
      occurence: 0,
      durPerOccurence: 0,
      subEvents: [],
    },
    {
      name: "Sorties",
      duration: 0,
      occurence: 0,
      durPerOccurence: 0,
      subEvents: [],
    },
    {
      name: "Associations",
      duration: 0,
      occurence: 0,
      durPerOccurence: 0,
      subEvents: [],
    },
    {
      name: "Obligations",
      duration: 0,
      occurence: 0,
      durPerOccurence: 0,
      subEvents: [],
    },
    {
      name: "Transports",
      duration: 0,
      occurence: 0,
      durPerOccurence: 0,
      subEvents: [],
    },
    {
      name: "Inconnu",
      duration: 0,
      occurence: 0,
      durPerOccurence: 0,
      subEvents: [],
    },
    {
      name: "Culturel",
      duration: 0,
      occurence: 0,
      durPerOccurence: 0,
      subEvents: [],
    },
  ]);
  const [dataDuration, setDataDuration] = useState({});
  const [dataOccurence, setDataOccurence] = useState({});
  const [reload, setReload] = useState(0);

  /*
   * Pour chaque évènement on calcule son pourcentage d'appartenance à chaque classe en transformant le titre avec le bon format et en le passant dans le réseau de neuronne
   * @return { Object[] } RecapDataWithPercentageClass
   */
  const classify = () => {
    let res = [];
    const net = new NeuralNetwork();
    net.train(corpus);
    fileArray.forEach((element) => {
      let title = {};
      element.name.split(" ").forEach((word) => {
        if (word != "-") title[word.toLowerCase().latinize()] = 1;
      });

      res.push({
        name: element.name,
        class: JSON.parse(JSON.stringify(net.run(title))),
        duration: element.duration,
        occurence: element.occurence,
        durPerOccurence: element.durPerOccurence,
      });
    });
    return res;
  };

  /*
   * Change l'attribut classe qui contenait le pourcentage de similarité de chaque classe par la classe qui corresponds le mieux (si il y en a une)
   * @param { Object[] } RecapDataWithPercentageClass
   * @return { Object } RecapDataWithOneClass
   */
  const attributeOneClass = (data) => {
    let res = [];
    data.forEach((element) => {
      let intMax = 0;
      let cat = "unknown";
      Object.keys(element.class).map((nameCat) => {
        if (element.class[nameCat] > 0.28) {
          if (element.class[nameCat] > intMax) {
            intMax = element.class[nameCat];
            cat = nameCat;
          }
        }
      });

      res.push({
        name: element.name,
        duration: element.duration,
        occurence: element.occurence,
        durPerOccurence: element.durPerOccurence,
        class: cat,
      });
    });
    return res;
  };

  /*
   * Classe chaque évènement dans la même catégorie
   * @param { Object[] } RecapDataWithOneClass
   * @return { Object } RecapDataPerClass
   */
  const totalPerClass = (data) => {
    let res = {
      tperso: { duration: 0, occurence: 0, event: [] },
      sortie: { duration: 0, occurence: 0, event: [] },
      association: { duration: 0, occurence: 0, event: [] },
      obligation: { duration: 0, occurence: 0, event: [] },
      transport: { duration: 0, occurence: 0, event: [] },
      unknown: { duration: 0, occurence: 0, event: [] },
      culturel: { duration: 0, occurence: 0, event: [] },
    };
    data.forEach((element) => {
      if (element.class == "sortie") {
        res["sortie"]["occurence"] += element.occurence;
        res["sortie"]["duration"] += element.duration;
        res["sortie"]["event"].push(element.name);
      }
      if (element.class == "culturel") {
        res["culturel"]["occurence"] += element.occurence;
        res["culturel"]["duration"] += element.duration;
        res["culturel"]["event"].push(element.name);
      }
      if (element.class == "tperso") {
        res["tperso"]["occurence"] += element.occurence;
        res["tperso"]["duration"] += element.duration;
        res["tperso"]["event"].push(element.name);
      }
      if (element.class == "obligation") {
        res["obligation"]["occurence"] += element.occurence;
        res["obligation"]["duration"] += element.duration;
        res["obligation"]["event"].push(element.name);
      }
      if (element.class == "transport") {
        res["transport"]["occurence"] += element.occurence;
        res["transport"]["duration"] += element.duration;
        res["transport"]["event"].push(element.name);
      }
      if (element.class == "association") {
        res["association"]["occurence"] += element.occurence;
        res["association"]["duration"] += element.duration;
        res["association"]["event"].push(element.name);
      }
      if (element.class == "unknown") {
        res["unknown"]["occurence"] += element.occurence;
        res["unknown"]["duration"] += element.duration;
        res["unknown"]["event"].push(element.name);
      }
    });
    return res;
  };

  /*
   * Classe chaque évènement dans la même catégorie dans un tableau qui contient le nom de la catégorie en attribut name
   * @param { Object[] } RecapDataWithOneClass
   * @return { Object[] } RecapDataPerClassArray
   */
  const totalPerClassArray = (data) => {
    let res = [
      {
        name: "Travail personnel",
        duration: 0,
        occurence: 0,
        durPerOccurence: 0,
        subEvents: [],
      },
      {
        name: "Sorties",
        duration: 0,
        occurence: 0,
        durPerOccurence: 0,
        subEvents: [],
      },
      {
        name: "Associations",
        duration: 0,
        occurence: 0,
        durPerOccurence: 0,
        subEvents: [],
      },
      {
        name: "Obligations",
        duration: 0,
        occurence: 0,
        durPerOccurence: 0,
        subEvents: [],
      },
      {
        name: "Transports",
        duration: 0,
        occurence: 0,
        durPerOccurence: 0,
        subEvents: [],
      },
      {
        name: "Inconnu",
        duration: 0,
        occurence: 0,
        durPerOccurence: 0,
        subEvents: [],
      },
      {
        name: "Culturel",
        duration: 0,
        occurence: 0,
        durPerOccurence: 0,
        subEvents: [],
      },
    ];
    data.forEach((element) => {
      if (element.class == "sortie") {
        res[1]["occurence"] += element.occurence;
        res[1]["duration"] += element.duration;
        res[1]["subEvents"].push(element);
      }
      if (element.class == "culturel") {
        res[6]["occurence"] += element.occurence;
        res[6]["duration"] += element.duration;
        res[6]["subEvents"].push(element);
      }
      if (element.class == "tperso") {
        res[0]["occurence"] += element.occurence;
        res[0]["duration"] += element.duration;
        res[0]["subEvents"].push(element);
      }
      if (element.class == "obligation") {
        res[3]["occurence"] += element.occurence;
        res[3]["duration"] += element.duration;
        res[3]["subEvents"].push(element);
      }
      if (element.class == "transport") {
        res[4]["occurence"] += element.occurence;
        res[4]["duration"] += element.duration;
        res[4]["subEvents"].push(element);
      }
      if (element.class == "association") {
        res[2]["occurence"] += element.occurence;
        res[2]["duration"] += element.duration;
        res[2]["subEvents"].push(element);
      }
      if (element.class == "unknown") {
        res[5]["occurence"] += element.occurence;
        res[5]["duration"] += element.duration;
        res[5]["subEvents"].push(element);
      }
    });
    res.forEach((e) => {
      e.durPerOccurence = Math.round((e.duration * 10) / e.occurence) / 10;
      e.duration = Math.round(e.duration * 10) / 10;
    });
    return res;
  };

  useEffect(() => {
    if (reload == 0) {
      setTotalArray(totalPerClassArray(attributeOneClass(classify())));
      setTotal(totalPerClass(attributeOneClass(classify())));

      setReload(1);
    }
    if (reload == 1) {
      setReload(2);
      setDataOccurence({
        labels: [
          "Travail personnel",
          "Sorties",
          "Activités culturelles",
          "Obligations",
          "Transports",
          "Associations",
          "Inconnu",
        ],
        datasets: [
          {
            label: "# of Votes",
            data: [
              total["tperso"]["occurence"],
              total["sortie"]["occurence"],
              total["culturel"]["occurence"],
              total["obligation"]["occurence"],
              total["transport"]["occurence"],
              total["association"]["occurence"],
              total["unknown"]["occurence"],
            ],
            backgroundColor: [
              "rgba(54, 162, 235, 0.2)",
              "rgba(144,238,144, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(128,0,128, 0.2)",
              "rgba(47,79,79, 0.2)",
              "rgba(167, 161, 216, 0.2)",
              "rgba(169,169,169,0.2)",
            ],
            borderColor: [
              "rgba(54, 162, 235, 1)",
              "rgba(144,238,144, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(128,0,128, 1)",
              "rgba(47,79,79, 1)",
              "rgba(167, 161, 216, 1)",
              "rgba(169,169,169,1)",
            ],
            borderWidth: 1,
          },
        ],
      });
      setDataDuration({
        labels: [
          "Travail personnel",
          "Sorties",
          "Activités culturelles",
          "Obligations",
          "Transports",
          "Associations",
          "Inconnu",
        ],
        datasets: [
          {
            label: "# of Votes",
            data: [
              total["tperso"]["duration"],
              total["sortie"]["duration"],
              total["culturel"]["duration"],
              total["obligation"]["duration"],
              total["transport"]["duration"],
              total["association"]["duration"],
              total["unknown"]["duration"],
            ],
            backgroundColor: [
              "rgba(54, 162, 235, 0.2)",
              "rgba(144,238,144, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(128,0,128, 0.2)",
              "rgba(47,79,79, 0.2)",
              "rgba(167, 161, 216, 0.2)",
              "rgba(169,169,169,0.2)",
            ],
            borderColor: [
              "rgba(54, 162, 235, 1)",
              "rgba(144,238,144, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(128,0,128, 1)",
              "rgba(47,79,79, 1)",
              "rgba(167, 161, 216, 1)",
              "rgba(169,169,169,1)",
            ],
            borderWidth: 1,
          },
        ],
      });
    }
    if (reload == 2) {
      setReload(3);
    }
  }, [
    total["tperso"]["duration"],
    total["sortie"]["duration"],
    total["culturel"]["duration"],
    total["obligation"]["duration"],
    total["transport"]["duration"],
    total["association"]["duration"],
    total["unknown"]["duration"],
    totalArray[0]["duration"],
    totalArray[1]["duration"],
    totalArray[2]["duration"],
    totalArray[3]["duration"],
    totalArray[4]["duration"],
    totalArray[5]["duration"],
    totalArray[6]["duration"],
  ]);

  return (
    <div>
      {Object.keys(dataDuration).length > 0 ? (
        <div>
          <div className="classif">
            <div className="graph">
              <div className="graphiqueSolo">
                <Pie data={dataDuration} />
                <p className="pMargin">Nombre d'heures par catégories</p>
              </div>
              <div className="graphiqueSolo">
                <Pie data={dataOccurence} />
                <p className="pMargin">Nombre d'occurences par catégories</p>
              </div>
            </div>
          </div>
          <h3>Détails</h3>
          <CollapsibleTable
            fileArray={totalArray}
            key={fileArray[0].name}
            sort={"duration"}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Classification;
