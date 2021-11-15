module.exports = class UserPayloadDto {
	constructor(user) {
		this.id = user.id
		this.email = user.email
		this.isActivated = user.isActivated
	}
}
