const mongoose = require("mongoose");
const Promise = require("bluebird");
const LeadModel = require("./model/Lead.js");
const InterestModel = require("./model/Interest.js");

mongoose.Promise = Promise;

const mongoString = process.env.DB_CONNECTION_STRING;

const createErrorResponse = (statusCode, message) => ({
  statusCode: statusCode || 501,
  headers: { "Content-Type": "text/plain" },
  body: message || "Incorrect id",
});

async function dbConnectAndExecuteV2(dbUrl) {
  try {
    const db = await mongoose.connect(dbUrl);

    return db;
  } catch (ex) {
    console.log(ex);
    return;
  }
}

module.exports.user = async (event, context, callback) => {
  const dbConnection = await dbConnectAndExecuteV2(mongoString);

  if (!dbConnection) {
    callback(null, createErrorResponse(400, "Unable to connect to database"));
    return;
  }

  try {
    const leads = await LeadModel.find().sort({ createdAt: -1 });

    callback(null, { statusCode: 200, body: JSON.stringify(leads) });
  } catch (ex) {
    callback(null, createErrorResponse(ex.statusCode, ex.message));
  } finally {
    dbConnection.connection.close();
  }
};

module.exports.createLead = async (event, context, callback) => {
  const data = JSON.parse(event.body);

  const dbConnection = await dbConnectAndExecuteV2(mongoString);

  if (!dbConnection) {
    callback(null, createErrorResponse(400, "Unable to connect to database"));
    return;
  }

  const lead = createLead({
    email: data.email,
    phone: data.phone,
    first_name: data.first_name,
    last_name: data.last_name,
  });

  const interest = createInterest({
    message: data.message,
  });

  let session = await mongoose.startSession();

  try {
    // session.startTransaction();

    await session.withTransaction(async () => {
      await lead.save({
        session,
      });

      interest.lead_id = lead.id;

      await interest.save({
        session,
      });

      callback(null, {
        statusCode: 200,
        body: JSON.stringify({ id: lead.id }),
      });
    });
  } catch (err) {
    if (err.code && err.code === 11000) {
      callback(
        null,
        createErrorResponse(409, "Provided email and phone already exists")
      );
    } else {
      callback(null, createErrorResponse(err.statusCode, err.message));
    }
  } finally {
    session.endSession();
    dbConnection.connection.close();
  }
};

const createInterest = ({ lead_id, message }) => {
  try {
    return new InterestModel({
      message,
      lead_id,
    });
  } catch (ex) {
    throw ex;
  }
};

const createLead = ({ email, phone, first_name, last_name }) => {
  try {
    return new LeadModel({
      email,
      phone,
      first_name,
      last_name,
    });
  } catch (ex) {
    throw ex;
  }
};
