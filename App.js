'use strict'
console.log(window); 
//este console me permite ver las cosas que posee la ventana. En este caso, me muestra el XLSX ya que se importó
//por medio de un script

var file;
var rowObject;
var evento1 = document.querySelector("#archivoexcel");
//document.querySelector("#tabla").style.display = "none";


evento1.addEventListener("change", (event)=>{
    file = event.target.files[0];
});

document.querySelector("#cargaExcel").addEventListener("click", () => {
    if (file) {
        let fileReader = new FileReader(); //FileReader es una clase para leer archivos y retorna un objeto
        fileReader.readAsBinaryString(file);
        fileReader.onload = (event) => {
            var data = event.target.result;
            var workbook = XLSX.read(data, {  //esta funcion lee el objeto xlsx que está en binario y retorna un objeto con direfentes cosas.
                type: "binary"
            });
            workbook.SheetNames.forEach(sheet => {
                rowObject = XLSX.utils.sheet_to_row_object_array(
                    workbook.Sheets[sheet]
                );
                console.log(rowObject);
                buildTable(rowObject);
                document.getElementById("tabla").style.cssText = "display: block; border: 1px solid; align-content: center;";

            });
        };
        /*Para que fileReader.onload se ejecute, debe haberse leido el contenido del file
        ya sea con readAsArrayBuffer, reasAsBinaryString entre otros... de lo contrario, 
        la funcion no se ejecuta.*/
    }
});

function buildTable(data){
    var table = document.getElementById('tabla')
    for(var i = 0; i < data.length; i++){
        var row =`<tr class="tabla">
                    <td>${data[i].EQUIPO}</td>
                    <td>${data[i].MARCA}</td>
                    <td>${data[i].MODELO}</td>
                    <td>${data[i].SERIE}</td>
                    <td>${data[i].RIESGO}</td>
                    <td>${data[i].REGISTRO_SANITARIO}</td>
                    <td>${data[i].ACTIVO_FIJO}</td>
                    <td>${data[i].ASIGNADO_A}</td>
                    <td>${data[i].UBICACION}</td>
                    </tr>`
        table.innerHTML += row
    }
}

