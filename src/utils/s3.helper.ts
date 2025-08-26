import fs from 'fs';
import path from 'path';
import { S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';

type UploadFile = {
	data: Buffer | Uint8Array | string;
	name: string;
	mimetype?: string | null;
};

const DEFAULT_REGION = process.env.AWS_REGION || 'ap-southeast-1';
const DEFAULT_BUCKET = process.env.AWS_S3_BUCKET || 'kenangan';

class S3Uploader {
	private static client = new S3Client({
		region: DEFAULT_REGION,
		credentials: process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY ? {
			accessKeyId: process.env.AWS_ACCESS_KEY_ID,
			secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
		} : undefined,
	});

	private static getPublicUrl(key: string) {
		// keep same style as previous implementation
		return `https://${DEFAULT_BUCKET}.s3-${DEFAULT_REGION}.amazonaws.com/${key}`;
	}

	static async photo(foto: UploadFile, customName: string | null = null): Promise<string> {
		const base = Buffer.isBuffer(foto.data) ? foto.data : Buffer.from(String(foto.data), 'binary');
		const currentDate = Date.now();
		const nameFile = foto.name.replace(/\s/g, '');
		const key = (customName || currentDate.toString()) + (customName ? '' : ('-' + nameFile));

		const upload = new Upload({
			client: S3Uploader.client,
			params: {
				Bucket: DEFAULT_BUCKET,
				Key: key,
				Body: base,
				ACL: 'public-read',
				ContentType: foto.mimetype || undefined,
			},
		});

		await upload.done();
		return S3Uploader.getPublicUrl(key);
	}

	static async content(foto: UploadFile, content: string): Promise<string> {
		const base = Buffer.isBuffer(foto.data) ? foto.data : Buffer.from(String(foto.data), 'binary');
		const currentDate = Date.now();
		const nameFile = foto.name.replace(/\s/g, '');
		const key = `${content}/${currentDate.toString()}-${nameFile}`;

		const params: any = {
			Bucket: DEFAULT_BUCKET,
			Key: key,
			Body: base,
			ACL: 'public-read',
		};

		if (content !== 'video-editor') {
			params.ContentType = foto.mimetype || undefined;
		}

		const upload = new Upload({ client: S3Uploader.client, params });
		await upload.done();
		return S3Uploader.getPublicUrl(key);
	}

	static async blob(foto: UploadFile, content: string): Promise<string> {
		const base = Buffer.isBuffer(foto.data) ? foto.data : Buffer.from(String(foto.data), 'binary');
		const currentDate = Date.now();
		const key = `${content}/${currentDate.toString()}.webm`;

		const upload = new Upload({
			client: S3Uploader.client,
			params: {
				Bucket: DEFAULT_BUCKET,
				Key: key,
				Body: base,
				ACL: 'public-read',
			},
		});

		await upload.done();
		return S3Uploader.getPublicUrl(key);
	}

	static async fileFromLocalToAWS({
		localPath,
		fileName,
		content,
		hasUniqueId = true,
	}: {
		localPath: string;
		fileName: string;
		content: string;
		hasUniqueId?: boolean;
	}): Promise<string> {
		const absolutePath = path.isAbsolute(localPath) ? localPath : path.resolve(localPath);
		const file = fs.readFileSync(absolutePath);
		const key = `${content}/${hasUniqueId ? Date.now() + '-' : ''}${fileName}`;

		const upload = new Upload({
			client: S3Uploader.client,
			params: {
				Bucket: DEFAULT_BUCKET,
				Key: key,
				Body: file,
				ACL: 'public-read',
			},
		});

		await upload.done();
		return S3Uploader.getPublicUrl(key);
	}
}

export default S3Uploader;
