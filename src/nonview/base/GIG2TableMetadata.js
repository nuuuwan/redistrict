import StringX from "../../nonview/base/StringX";
import GIG2_TABLE_NAMES from "../constants/GIG2_TABLE_NAMES.js";

const FILE_BASE = "/public/data/gig2";
export default class GIG2TableMetadata {
  static fromMET(measurement, entity, time) {
    return new GIG2TableMetadata([measurement, entity, time].join("."));
  }
  constructor(tableName) {
    this.tableName = tableName;
  }

  get tokens() {
    return this.tableName.split(".");
  }

  get fileName() {
    return FILE_BASE + this.tableName + ".tsv";
  }

  get measurement() {
    return this.tokens[0];
  }

  get measurementTokens() {
    return this.measurement.split("-");
  }

  get measurementLowest() {
    return StringX.toTitleCase(this.measurementTokens.slice(-1)[0]);
  }

  get measurement2ndLowest() {
    return StringX.toTitleCase(this.measurementTokens.slice(-2)[0]);
  }

  get group() {
    return StringX.toTitleCase(this.measurementTokens[0]);
  }

  get entity() {
    return this.tokens[1];
  }

  get time() {
    return this.tokens[2];
  }

  get dataSource() {
    if (this.entity === "regions") {
      return "statistics.gov.lk";
    }

    if (this.entity === "regions-ec") {
      return "elections.gov.lk";
    }

    return "unknown";
  }

  getTimes() {
    return GIG2_TABLE_NAMES.map((tableName) => new GIG2TableMetadata(tableName))
      .filter(
        function (tableMetadata) {
          return (
            tableMetadata.measurement === this.measurement &&
            tableMetadata.entity === this.entity
          );
        }.bind(this)
      )
      .map((tableMetadata) => tableMetadata.time);
  }
}
