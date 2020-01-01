module.exports = (sequelize,DataTypes)=>{
    const user = sequelize.define('user',{
        //用户id
        user_id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            allowNull: false,
            autoIncrement: true,
        },
        user_name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        password:{
            type:sequelize.STRING,
            defaultValue:'123456'
        },
        user_type:{
            type:sequelize.INTEGER,
            defaultValue:1001,
            allowNull:false
        }
    })
}