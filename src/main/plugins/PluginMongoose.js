const Mongoose = require ("mongoose")

module.exports = function plugin_e(schema, options){
    schema.pre("save", function(next){
        if(!schema.id){
            schema.add({id: Mongoose.Schema.Types.ObjectId})
        }
        this.id = this._id
        next()
    });
    schema.pre("/^find/", function(next){
        if(!schema.id){
            schema.add({id: Mongoose.Schema.Types.ObjectId})
        }
        this.select('-id -__v')
        next()
    });
}