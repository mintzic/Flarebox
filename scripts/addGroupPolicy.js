// const { exec } = require("child_process");
// const util = require("util");
// const execPromise = util.promisify(exec);
const axios = require("axios");
const minioConfig = require("../config/minioConfig");
const aws4 = require("aws4");

const policies = [
  {
    policyName: "user-bucket-policy",
    groupName: "users",
    policyJSON: {
      Version: "2012-10-17",
      Statement: [
        {
          Effect: "Allow",
          Action: ["s3:ListBucket"],
          Resource: ["arn:aws:s3:::${aws:username}"],
        },
        {
          Effect: "Allow",
          Action: ["s3:GetObject", "s3:PutObject", "s3:DeleteObject"],
          Resource: ["arn:aws:s3:::${aws:username}/*"],
        },
      ],
    },
  },
];

async function createGroupPolicy() {
  try {
    for (const policy of policies) {
      const url = new URL(`http://${minioConfig.endPoint}:${minioConfig.port}/minio/admin/v3/add-canned-policy`);
      url.searchParams.append("name", policy.policyName);

      console.log(`Creating policy on: ${url.toString()}`);
      console.log(`Using endpoint: ${minioConfig.endPoint}, port: ${minioConfig.port}`);

      const requestData = {
        method: "PUT",
        host: url.hostname,
        port: url.port,
        path: `${url.pathname}${url.search}`,
        service: "s3",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(policy.policyJSON),
      };

      const signedRequest = aws4.sign(requestData, {
        accessKeyId: minioConfig.accessKey,
        secretAccessKey: minioConfig.secretKey,
      });

      console.log("Signed headers:", JSON.stringify(signedRequest.headers, null, 2));

      const response = await axios({
        method: requestData.method,
        url: url.toString(),
        headers: signedRequest.headers,
        data: requestData.body,
      });

      console.log("Policy created successfully:", response.data);
    }
  } catch (error) {
    console.error("Error creating policy:", error);
  }
}

createGroupPolicy();
