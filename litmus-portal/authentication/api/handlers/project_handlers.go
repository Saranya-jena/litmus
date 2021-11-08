package handlers

import (
	"fmt"
	"litmus/litmus-portal/authentication/api/presenter"
	"litmus/litmus-portal/authentication/pkg/entities"
	"litmus/litmus-portal/authentication/pkg/project"
	"litmus/litmus-portal/authentication/pkg/user"
	"litmus/litmus-portal/authentication/pkg/utils"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
	"go.mongodb.org/mongo-driver/bson"
)

// GetProject queries the project with a given projectID from the database
func GetProject(service project.Service) gin.HandlerFunc {
	return func(c *gin.Context) {
		projectID := c.Param("project_id")
		project, err := service.GetProjectByProjectID(projectID)
		if err != nil {
			return
		}

		// Fetching user ids of all the members in the project
		var uids []string
		for _, member := range project.Members {
			uids = append(uids, member.UserID)
		}

		memberMap := make(map[string]entities.User)
		var userService user.Service
		authUsers, err := userService.FindUsersByUID(uids)
		for _, authUser := range *authUsers {
			memberMap[authUser.ID] = authUser
		}

		// Adding additional details of project members
		for _, member := range project.Members {
			member.Email = memberMap[member.UserID].Email
			member.Name = memberMap[member.UserID].Name
			member.UserName = memberMap[member.UserID].UserName
			member.DeactivatedAt = *memberMap[member.UserID].DeactivatedAt
		}

		if err != nil {
			return
		}

		c.JSON(200, project)
	}
}

// GetProjectsByUserID queries the project with a given userID from the database and returns it in the appropriate format
func GetProjectsByUserID(service project.Service) gin.HandlerFunc {
	return func(c *gin.Context) {
		uID := c.Param("uid")
		projects, err := service.GetProjectsByUserID(uID, false)
		if err != nil {
			log.Error("Error getting project")
			return
		}
		fmt.Println("here1")

		var uids []string
		var outputProjects []*entities.Project

		// Fetching user ids of all members from all user's projects
		for _, project := range projects {
			for _, member := range project.Members {
				uids = append(uids, member.UserID)
			}
		}
		var userService user.Service
		fmt.Println("here2", uids)

		authUsers, err := userService.FindUsersByUID(uids)
		fmt.Println("here3")
		if err != nil || authUsers == nil {
			return
		}
		fmt.Println("user", authUsers)

		memberMap := make(map[string]entities.User)

		for _, authUser := range *authUsers {
			memberMap[authUser.ID] = authUser
		}

		// Adding additional details of project members
		for _, project := range projects {
			for _, member := range project.Members {
				member.UserName = memberMap[member.UserID].UserName
				member.Name = memberMap[member.UserID].Name
				member.Email = memberMap[member.UserID].Email
				member.DeactivatedAt = *memberMap[member.UserID].DeactivatedAt
			}
			outputProjects = append(outputProjects, project.GetProjectOutput())
		}

		c.JSON(200, outputProjects)
	}
}

// getInvitation returns the Invitation status
func getInvitation(service project.Service, member entities.MemberInput) (entities.Invitation, error) {
	project, err := service.GetProjectByProjectID(member.ProjectID)
	if err != nil {
		return "", err
	}
	for _, projectMember := range project.Members {
		if projectMember.UserID == member.UserID {
			return projectMember.Invitation, nil
		}
	}

	return "", nil
}

// SendInvitation sends an invitation to a new user and
// returns an error if the member is already part of the project
func SendInvitation(service project.Service) gin.HandlerFunc {
	return func(c *gin.Context) {
		var member entities.MemberInput
		err := c.BindJSON(&member)
		if err != nil {
			log.Warn(err)
			c.JSON(utils.ErrorStatusCodes[utils.ErrInvalidRequest], presenter.CreateErrorResponse(utils.ErrInvalidRequest))
			return
		}
		var userService user.Service
		users, err := userService.FindUsersByUID([]string{member.UserID})
		user := *users
		if err != nil {
			return
		}

		invitation, err := getInvitation(service, member)
		if err != nil {
			return
		}

		if invitation == entities.AcceptedInvitation {
			log.Print("user is already a member of this project")
			return
		} else if invitation == entities.PendingInvitation || invitation == entities.DeclinedInvitation || invitation == entities.ExitedProject {
			err = service.UpdateInvite(member.ProjectID, member.UserID, entities.PendingInvitation, member.Role)
			if err != nil {
				return
			}
			return
		}

		newMember := &entities.Member{
			UserID:     user[0].ID,
			Role:       *member.Role,
			Invitation: entities.PendingInvitation,
			JoinedAt:   strconv.FormatInt(time.Now().Unix(), 10),
		}

		err = service.AddMember(member.ProjectID, newMember)
		if err != nil {
			return
		}

		c.JSON(200, newMember.GetMemberOutput())
	}
}

// AcceptInvitation is used to accept an invitation
func AcceptInvitation(service project.Service) gin.HandlerFunc {
	return func(c *gin.Context) {
		var member entities.MemberInput
		err := c.BindJSON(&member)
		if err != nil {
			log.Warn(err)
			c.JSON(utils.ErrorStatusCodes[utils.ErrInvalidRequest], presenter.CreateErrorResponse(utils.ErrInvalidRequest))
			return
		}

		err = service.UpdateInvite(member.ProjectID, member.UserID, entities.AcceptedInvitation, nil)
		if err != nil {
			return
		}

		c.JSON(200, gin.H{
			"message": "Successful",
		})
	}
}

// DeclineInvitation is used to decline an invitation
func DeclineInvitation(service project.Service) gin.HandlerFunc {
	return func(c *gin.Context) {
		var member entities.MemberInput
		err := c.BindJSON(&member)
		if err != nil {
			log.Warn(err)
			c.JSON(utils.ErrorStatusCodes[utils.ErrInvalidRequest], presenter.CreateErrorResponse(utils.ErrInvalidRequest))
			return
		}

		err = service.UpdateInvite(member.ProjectID, member.UserID, entities.DeclinedInvitation, nil)
		if err != nil {
			return
		}

		c.JSON(200, gin.H{
			"message": "Successful",
		})
	}
}

// LeaveProject is used to leave a project
func LeaveProject(service project.Service) gin.HandlerFunc {
	return func(c *gin.Context) {
		var member entities.MemberInput
		err := c.BindJSON(&member)
		if err != nil {
			log.Warn(err)
			c.JSON(utils.ErrorStatusCodes[utils.ErrInvalidRequest], presenter.CreateErrorResponse(utils.ErrInvalidRequest))
			return
		}

		err = service.UpdateInvite(member.ProjectID, member.UserID, entities.ExitedProject, nil)
		if err != nil {
			return
		}

		c.JSON(200, gin.H{
			"message": "Successful",
		})
	}
}

// RemoveInvitation removes member or cancels invitation
func RemoveInvitation(service project.Service) gin.HandlerFunc {
	return func(c *gin.Context) {
		var member entities.MemberInput
		err := c.BindJSON(&member)
		if err != nil {
			log.Warn(err)
			c.JSON(utils.ErrorStatusCodes[utils.ErrInvalidRequest], presenter.CreateErrorResponse(utils.ErrInvalidRequest))
			return
		}

		invitation, err := getInvitation(service, member)
		if err != nil {
			return
		}

		switch invitation {
		case entities.AcceptedInvitation, entities.PendingInvitation:
			{
				err := service.RemoveInvitation(member.ProjectID, member.UserID, invitation)
				if err != nil {
					return
				}
			}

		case entities.DeclinedInvitation, entities.ExitedProject:
			{
				log.Print("User is already not a part of your project")
				return
			}
		}

		c.JSON(200, gin.H{
			"message": "Successful",
		})
	}
}

//  UpdateProjectName is used to update a project's name
func UpdateProjectName(service project.Service) gin.HandlerFunc {
	return func(c *gin.Context) {
		var userRequest entities.ProjectInput
		err := c.BindJSON(&userRequest)
		if err != nil {
			log.Warn(err)
			c.JSON(utils.ErrorStatusCodes[utils.ErrInvalidRequest], presenter.CreateErrorResponse(utils.ErrInvalidRequest))
			return
		}

		uid := c.MustGet("uid").(string)

		// Checking for duplicate project name
		filter := bson.D{{"name", userRequest.ProjectName}, {"members.user_id", uid}, {"members.role", entities.RoleOwner}}
		projects, err := service.GetProjects(filter)
		if err != nil {
			return
		}

		if len(projects) > 0 {
			log.Print("project with name: " + userRequest.ProjectName + " already exists.")
			return
		}

		err = service.UpdateProjectName(userRequest.ProjectID, userRequest.ProjectName)
		if err != nil {
			log.Error("Error updating project name")
			return
		}

		c.JSON(200, gin.H{
			"message": "Successful",
		})
	}
}
