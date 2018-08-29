using Sabio.Models.Domain;
using Sabio.Models.Requests;
using Sabio.Models.Responses;
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
    [RoutePrefix("api/games")]
    public class GameController:ApiController
    {
        readonly GameService gameService;

        public GameController(GameService gameService)
        {
            this.gameService = gameService;
        }

        [Route, HttpGet]
        public HttpResponseMessage GetAllGames()
        {
            PagedItemResponse<Game> pagedItemResponse = gameService.GetAllGames();
            return Request.CreateResponse(HttpStatusCode.OK, new ItemResponse<PagedItemResponse<Game>>
            {

                Item = pagedItemResponse

            });
        }

        [Route("{gameId:int}"), HttpGet]
        public HttpResponseMessage GetGamesById(int gameId)
        {
            ItemResponse<Game> ItemResponse = gameService.GetGameById(gameId);
            return Request.CreateResponse(HttpStatusCode.OK, ItemResponse);
        }

        [Route, HttpPost]
        public HttpResponseMessage InsertGame(GameInsert gameInsert)
        {
            int gameId = gameService.InsertGame(gameInsert);
            return Request.CreateResponse(HttpStatusCode.OK, new ItemResponse<int>
            {
                Item = gameId
            });
        }

        [Route("{gameId:int}"), HttpPut]
        public HttpResponseMessage UpdateGame(GameUpdate gameUpdate, int gameId)
        {
            if (gameUpdate == null)
            {
                ModelState.AddModelError("", "Data is null");
            }

            else if (gameId != gameUpdate.Id)
            {
                ModelState.AddModelError("Id", "Id does not match");
            }

            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            gameService.UpdateGame(gameUpdate);
            return Request.CreateResponse(HttpStatusCode.OK);
        }


        [Route("{gameId:int}"), HttpDelete]
        public HttpResponseMessage DeleteGame(int gameId)
        {

            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            gameService.DeleteGame(gameId);
            return Request.CreateResponse(HttpStatusCode.OK);
        }
    }
}