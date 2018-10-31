package com.lawfirm.view.client;

import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;

@Path("lookupsType")
public class GenericResource {
    public GenericResource() {
    }

    @DELETE
    public void deleteData(String content) {

        // Provide method implementation.

    }

    @POST
    public Response postData(String content) {

        // Provide method implementation.
        // TODO

        throw new UnsupportedOperationException();
    }

    @GET
    public String getData() {

        // Provide method implementation.
        // TODO

        throw new UnsupportedOperationException();
    }

    @PUT
    public String putData(String content) {

        // Provide method implementation.
        // TODO

        throw new UnsupportedOperationException();
    }
}
