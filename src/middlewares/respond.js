module.exports = {
  successResponse: (res, statusCode, message, data, req) => {
    let response;
    if (data) {
      response = {
        error: false,
        message: message,
        data,
      };
      return res.status(statusCode).json(response);
    }
    response = {
      error: false,
      message: message,
    };
    return res.status(statusCode).json(response);
  },
  errorResponse: (res, error, statusCode, req, action) => {
    let response;
    if (error.name === "ValidationError") {
      let errors = {};

      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });
      response = {
        error: true,
        message: errors,
      };

      return res.status(400).json(response);
    }

    if (statusCode && error) {
      response = {
        error: true,
        message: error,
      };

      return res.status(statusCode).json(response);
    }
    if (statusCode === 404 && error === "") {
      response = {
        error: true,
        message: "Tidak dapat menemukan data",
      };

      return res.status(404).json(response);
    }
    console.log(error);
    response = {
      error: true,
      message: error,
    };

    return res.status(500).json(response);
  },
};
