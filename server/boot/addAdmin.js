module.exports = async app => {
    const Account = app.models.Account;
    const Role = app.models.Role;
    const RoleMapping = app.models.RoleMapping;

    let account = await Account.findOne({ where: { email: "nguyenvana@gmail.com" } })
    if (!account) account = await Account.create({
        email: "nguyenvana@gmail.com",
        password: "123456"
    })
    //role: admin
    let role = await Role.findOne({ where: { name: "admin" } })
    if (!role) {
        role = await Role.create({
            name: "admin",
        })
        role.principals.create({
            principalType: RoleMapping.USER,
            principalId: account.id
            //mappming
        })
    }
}
//role tao 1 name ten admin, roleMapping anh xa giua role va account.id => chi dinh quyen admin