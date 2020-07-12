"use strict";

class BaseController {
    response(response, result) {
        return response.json({
            status: "success",
            result: result,
        });
    }
}

module.exports = BaseController;
