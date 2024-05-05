/* eslint-disable */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-continue */
/* eslint-disable no-tabs */
const GeoLib = require('geolib');
const Config = require('../config/config');
const SearchEngine = require('../services/nominatim.service');

function ToNonAccentVietnamese(str) {
  let StrConvert;
  StrConvert = str.toLowerCase();
  // str = str.replace(/đường|ngõ|phường|phố|quận|huyện/g, "");
  StrConvert = StrConvert.trim();
  StrConvert = StrConvert.replaceAll(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  StrConvert = StrConvert.replaceAll(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  StrConvert = StrConvert.replaceAll(/ì|í|ị|ỉ|ĩ/g, 'i');
  StrConvert = StrConvert.replaceAll(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  StrConvert = StrConvert.replaceAll(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  StrConvert = StrConvert.replaceAll(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  StrConvert = StrConvert.replaceAll(/đ/g, 'd');
  // Some system encode vietnamese combining accent as individual utf-8 characters
  StrConvert = StrConvert.replaceAll(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // Huyền sắc hỏi ngã nặng
  StrConvert = StrConvert.replaceAll(/\u02C6|\u0306|\u031B/g, ''); // Â, Ê, Ă, Ơ, Ư
  StrConvert = StrConvert.replaceAll(/ /g, '_');
  StrConvert = StrConvert.replaceAll(/[^a-z0-9 _]/gi, '');
  StrConvert = StrConvert.replaceAll('__', '_');
  return StrConvert;
}

const GetDistance = (lat1, lon1, lat2, lon2, unit) => {
  // :::  Passed to function:                                                    :::
  // :::    lat1, lon1 = Latitude and Longitude of point 1 (in decimal degrees)  :::
  // :::    lat2, lon2 = Latitude and Longitude of point 2 (in decimal degrees)  :::
  // :::    unit = the unit you desire for results                               :::
  // :::           where: 'M' is statute miles (default)                         :::
  // :::                  'K' is kilometers                                      :::
  // :::                  'N' is nautical miles
  if (lat1 === lat2 && lon1 === lon2) {
    return 0;
  }
  const radlat1 = (Math.PI * lat1) / 180;
  const radlat2 = (Math.PI * lat2) / 180;
  const theta = lon1 - lon2;
  const radtheta = (Math.PI * theta) / 180;
  let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  if (dist > 1) {
    dist = 1;
  }
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  if (unit === 'K') {
    dist *= 1.609344;
  }
  if (unit === 'N') {
    dist *= 0.8684;
  }
  return dist;
};

function ConvertDeg2Rad(degrees) {
  return (degrees * Math.PI) / 180;
}

function ConvertRad2Deg(radians) {
  const pi = Math.PI;
  return radians * (180 / pi);
}

function ConvertCompass(compass_) {
  const val = Math.floor(compass_ / 90 + 0.5);
  const arr = ['NE', 'SE', 'SW', 'NW'];
  return arr[val % 4];
}

function CalculateInitialCompassBearing(pointA, pointB) {
  const lat1 = ConvertDeg2Rad(pointA[0]);
  const lat2 = ConvertDeg2Rad(pointB[0]);

  const diffLong = ConvertDeg2Rad(pointB[1] - pointA[1]);

  const x = Math.sin(diffLong) * Math.cos(lat2);
  const y = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(diffLong);

  let initialBearing = Math.atan2(x, y);
  initialBearing = ConvertRad2Deg(initialBearing);
  const compassBearing = (initialBearing + 360) % 360;

  return compassBearing;
}

function ConvertDPDataOutputToGPX(DPData) {
  let newRecord;
  let gpx;
  for (let i = 0; i < DPData.length; i += 1) {
    newRecord =
      `<wpt lat=\"${DPData[i].lat}\" lon=\"${DPData[i].lon}\">\n <name>` +
      `Point${i}   ${DPData[i].osm_combination_id}</name>\n <desc>${DPData[i].max_speed}</desc>\n </wpt>\n`;
    if (!gpx) {
      // eslint-disable-next-line no-useless-escape
      gpx = '<?xml version="1.0"?>\n<gpx version="1.1" creator="hiennv">\n';
    } else {
      gpx += newRecord;
    }
  }
  gpx += '</gpx>';
  return gpx;
}

function GetSPByDistance(data_, latBase_, lonBase_, distance_) {
  const latMin = latBase_ - distance_;
  const latMax = latBase_ + distance_;
  const lonMin = lonBase_ - distance_;
  const lonMax = lonBase_ + distance_;

  return data_.filter((dt) => dt.lat >= latMin && dt.lat <= latMax && dt.lon >= lonMin && dt.lon <= lonMax);
}

function GetBBoxFromListPoint(listPoint) {
  let bbox;
  if (listPoint.length < 2) {
    bbox = {
      maxLat: listPoint[0].latitude + 0.0623,
      maxLng: listPoint[0].longitude + 0.0623,
      minLat: listPoint[0].latitude - 0.0623,
      minLng: listPoint[0].longitude - 0.0623,
    };
  } else {
    bbox = GeoLib.getBounds(listPoint);
    // 0.089 <=> 10km => 0.0623 => 7km
    bbox.maxLat += 0.0623;
    bbox.maxLng += 0.0623;
    bbox.minLat -= 0.0623;
    bbox.minLng -= 0.0623;
  }
  return bbox;
}

function findNearestPosition(basePoint, listPoint) {
  let currenPoint = listPoint[0] ? listPoint[0] : {};
  for (let i = 0; i < listPoint.length; i += 1) {
    const dist1 = GetDistance(basePoint.lat, basePoint.lon, currenPoint.lat, currenPoint.lon, 'K');
    const dist2 = GetDistance(basePoint.lat, basePoint.lon, listPoint[i].lat, listPoint[i].lon, 'K');
    if (dist2 < dist1) {
      currenPoint = listPoint[i];
    }
  }
  return currenPoint;
}

module.exports = {
  CalculateInitialCompassBearing,
  ToNonAccentVietnamese,
  GetDistance,
  GetSPByDistance,
  ConvertDPDataOutputToGPX,
  GetBBoxFromListPoint,
  findNearestPosition,
};
