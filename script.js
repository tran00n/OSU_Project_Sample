

dict = {} 
fetch("https://s3-us-west-2.amazonaws.com/cdt-web-storage/cities.json")
.then(function(response) {
    return response.json();
})
.then(function(cities) {
    let datatable = document.querySelector("#data-output");
    let out = "";

    for (let row of cities) {
        let d = distance(44.5638, -123.2794, row.lat, row.lng, "M");
        let s = `
        <tr> 
            <td> ${row.city} </td>
            <td> ${row.lat} </td>
            <td> ${row.lng} </td>
            <td> ${d} </td>
        </tr>
        `;

        dict[d] = s;
        out += s;
    }

    datatable.innerHTML = out;
})

asc = false;

function sortbydist() {
    let datatable = document.querySelector("#data-output");
    let out = "";
    //asc = document.getElementById("selectsort").selectedIndex;
    asc = !asc;
    if (asc==true) {
        val1 = -1;
        val2 = 1;
    }
    else {
        val1 = 1;
        val2 = -1;
    }
    sorted_distance = Object.keys(dict).sort(
        function(a,b) {
            if (parseFloat(a) < parseFloat(b)) {
                return val1;
            }
            else if (parseFloat(a) > parseFloat(b)) {
                return val2;
            }
            else {
                return 0;
            }
        }
    );

    console.log(sorted_distance);
    sorted_distance.forEach(element => {
        out += dict[element];
    });

    datatable.innerHTML = out; 
      
}

function distance(lat1, lon1, lat2, lon2, unit) {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		return dist;
	}
}
