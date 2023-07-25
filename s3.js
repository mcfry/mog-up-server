const aws = require('aws-sdk')
const crypto = require('crypto')
const { promisify } = require('util')
require('dotenv').config()

const randomBytes = promisify(crypto.randomBytes)

const region = "us-east-1"
const bucketName = "mogup-image-bucket"
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

const s3 = new aws.S3({
	region,
	accessKeyId,
	secretAccessKey,
	signatureVersion: 'v4'
})

module.exports = async function generateUploadUrl() {
	const rawBytes = await randomBytes(16)
	const imageName = rawBytes.toString('hex')

	const params = ({
		Bucket: bucketName,
		Key: imageName,
		Expires: 60
	})

	const uploadUrl = await s3.getSignedUrlPromise('putObject', params)
	return uploadUrl
}