import { useState } from "react";
import * as React from 'react';
const NewPack = (items) =>{
    // display item name (one with the selected characteristic
    // ex:cold/ hot or beach/mountain)
    // const[ itemName , setItemName ] = useState("");

    // number of items depends on the number of days selected
    // display number of those items

    const itemsToPack = items.items.map((item) => {
        return(
        <tr>
            <td>{item.denumire}</td>
            <td>{item.nrBuc}</td>
            <td><input type="checkbox" /></td>
        </tr>
        );
    });

    return(
        <form className = "pack-form">
            <div id="items-list">
              <table>
                <thead>
                    <tr>
                        <th>Item to pack</th>
                        <th>Number of items</th>
                        <th>Is packed</th>
                    </tr>
                </thead>
                {itemsToPack}
              </table>
            </div>
        </form>
    )

} // end of NewPack

export default NewPack