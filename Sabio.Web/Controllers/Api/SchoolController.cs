﻿using Sabio.Models.Domain;
using Sabio.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace Sabio.Web.Controllers.Api
{
    [RoutePrefix("api")]
    public class SchoolController : ApiController
    {
            readonly SchoolService schoolService;

            public SchoolController(SchoolService schoolService)
            {
                this.schoolService = schoolService;
            }
            [Route("schools"), HttpGet]
            public HttpResponseMessage GetAll()
            {
                List<Schools> listOfSchools = schoolService.GetAll();
                return Request.CreateResponse(HttpStatusCode.OK, listOfSchools);
            }
        }
    }
