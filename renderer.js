/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */
let json = undefined;
window.bridge.loadJson((_event, spellsJson) => {
    json = spellsJson;
    loadTable();
});

const div = document.querySelector('div')

document.querySelector("#spell-table").addEventListener("click", (event) => {
  if(event.target.tagName === 'A') {
    selectSpell(event.target.innerText);
  }
});

document.querySelector("#list-filter").addEventListener('input' , e => {
    const term = e.target.value.toUpperCase();
    const rows = document.querySelectorAll(".spell-row");
    for (const row of rows) 
    {
        const name = row.firstChild.textContent.toUpperCase();
        const matches = name.includes(term);
        if (matches)
        {
            row.style.display='table-row';
        }
        else
        {
            row.style.display='none'
        }
    }
});

function loadTable()
{   
    // Find a <table> element with id="myTable":
    const table = document.getElementById("spell-table");

    
    for (const spell of json)
    {
        const level = capitalizeFirstLetter(spell.level);

        // Create an empty <tr> element and add it to the 1st position of the table:
        var row = table.insertRow();
        row.classList.add("spell-row");

        // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);

        // Add some text to the new cells:
        cell1.innerHTML = `<a href="#">${spell.name}</a>`;
        cell2.innerHTML = level;
    }
}

function selectSpell(name)
{
    let spell = undefined;
    for (const row of json)
    {
        const targetName = row.name; 
        if (targetName === name)
        {
            spell = row; 
            break;
        }
    }
    if (spell != undefined)
    {
        document.getElementById("spell-name").innerText = spell.name;
        document.getElementById("spell-type").innerText = spell.type;
        document.getElementById("casting-time").innerText = spell.casting_time;
        document.getElementById("range").innerText = spell.range;
        document.getElementById("components").innerText = spell.components?.raw;
        document.getElementById("duration").innerText = spell.duration;

        capitalizedClasses = [];
        for (const c of spell.classes)
        {
            capitalizedClasses.push(capitalizeFirstLetter(c));
        }
        let classes = capitalizedClasses.join(", ");
        document.getElementById("classes").innerText = classes;
        
        document.getElementById("description").innerHTML = "";
        descriptionSentences = splitDescription(spell.description);
        for (const sentence of descriptionSentences)
        {
            const newDiv = document.createElement("div");
            const newContent = document.createTextNode(sentence);
            newDiv.appendChild(newContent);
            document.getElementById("description").appendChild(newDiv);
        }

        if (spell.higher_levels != undefined)
        {
            document.getElementById("higher-levels").innerText = spell.higher_levels;
        }
    }
}

function splitDescription(text)
{
    let parts = text.match( /[^\.!\?]+[\.!\?]+/g );
    return parts;
}

function capitalizeFirstLetter(string) 
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}