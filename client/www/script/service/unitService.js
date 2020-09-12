

let UnitService = {

    units: {},

    addUnit = (unit) => {
        
        if(this.units.hasOwnProperty(unit.id)) {
            
            console.log('error add unit by ' + unit.id);

            return null;
        }

        this.units[unit.id] = unit;

        return this.units[unit.id];
    },

    getUnit = (id) => {

        if(!this.units.hasOwnProperty(id)) {
            
            console.log('error get unit by ' + id);

            return null;
        }

        return this.units[id];
    },

    removeUnit = (id) => {

        if(!this.units.hasOwnProperty(id)) {
            
            console.log('error remove unit by ' + id);

            return;
        }

        delete this.units[id];
    }
}