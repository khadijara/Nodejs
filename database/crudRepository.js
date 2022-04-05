// for Users and Room

module.exports.findById = async (data) => {
    let responseObj = { status: false };
    try {
        const docs = await data.model.findById(data._id, data.projection);
        responseObj = {
            result: docs,
            status: true
        };
    } catch(error) {
        responseObj.error = error;
        console.log('ERROR-Repository-findById: ', error);
    }
    return responseObj;
};

module.exports.find = async (data) => {
    let responseObj = { status: false };
    try {
        const docs = await data.model.find(data.findQuery, data.projection).skip(data.skip).limit(data.limit);
        responseObj = {
            result: docs,
            status: true
        };
    } catch(error) {
        responseObj.error = error;
        console.log('ERROR-Repository-find: ', error);
    }
    return responseObj;
};

module.exports.save = async (objToSave) => {
    let responseObj = { status: false };
    try {
        const doc = await objToSave.save();
        responseObj = {
            result: doc,
            status: true
        };
    } catch(error) {
        responseObj.error = error;
        console.log('ERROR-Repository-save: ', error);
    }
    return responseObj;
};

module.exports.findOneAndUpdate = async (data) => {
    let responseObj = { 
        status: false 
    };
    try {
        const doc = await data.model.findOneAndUpdate(
                            data.findQuery,
                            data.updateQuery, 
                            {new: true, projection: data.projection, useFindAndModify: false}
                        );
        responseObj = {
            result: doc,
            status: true
        };
    } catch(error) {
        responseObj.error = error;
        console.log('ERROR-Repository-findOneAndUpdate: ', error);
    }
    return responseObj;
};

module.exports.findOneAndDelete = async (data) => {
    let responseObj = { status: false };
    try {
        const doc = await data.model.findOneAndDelete(data.findQuery, {projection: data.projection});
        responseObj = {
            result: doc,
            status: true
        };
    } catch(error) {
        responseObj.error = error;
        console.log('ERROR-Repository-findOneAndDelete: ', error);
    }
    return responseObj;
};

module.exports.findOne = async (data) => {
    let responseObj = { status: false };
    try {
        const docs = await data.model.findOne(data.findQuery);
        responseObj = {
            result: docs,
            status: true
        };
    } catch(error) {
        responseObj.error = error;
        console.log('ERROR-Repository-findOne: ', error);
    }
    return responseObj;
};