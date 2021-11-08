package routes

import (
	"litmus/litmus-portal/authentication/api/handlers"
	"litmus/litmus-portal/authentication/pkg/project"

	"github.com/gin-gonic/gin"
)

// ProjectRouter creates all the required routes for project related purposes.
func ProjectRouter(router *gin.Engine, service project.Service) {
	router.GET("/getProject/:project_id", handlers.GetProject(service))
	router.GET("/listProjects/:uid", handlers.GetProjectsByUserID(service))
	router.POST("/sendInvitation", handlers.SendInvitation(service))
	router.POST("/acceptInvitation", handlers.AcceptInvitation(service))
	router.POST("/declineInvitation", handlers.DeclineInvitation(service))
	router.POST("/removeInvitation", handlers.LeaveProject(service))
	router.POST("/leaveProject", handlers.RemoveInvitation(service))
	router.POST("/updateProjectName", handlers.UpdateProjectName(service))
}
