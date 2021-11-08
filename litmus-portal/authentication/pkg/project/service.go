package project

import (
	"litmus/litmus-portal/authentication/pkg/entities"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Service interface {
	GetProjectByProjectID(projectID string) (*entities.Project, error)
	GetProjects(query bson.D) ([]*entities.Project, error)
	GetProjectsByUserID(uid string, isOwner bool) ([]*entities.Project, error)
	CreateProject(project *entities.Project) error
	AddMember(projectID string, member *entities.Member) error
	RemoveInvitation(projectID string, userID string, invitation entities.Invitation) error
	UpdateInvite(projectID string, userID string, invitation entities.Invitation, role *entities.MemberRole) error
	UpdateProjectName(projectID string, projectName string) error
	GetAggregateProjects(pipeline mongo.Pipeline, opts *options.AggregateOptions) (*mongo.Cursor, error)
}

type service struct {
	repository Repository
}

func (a service) GetProjectByProjectID(projectID string) (*entities.Project, error) {
	return a.repository.GetProjectByProjectID(projectID)
}

func (a service) GetProjects(query bson.D) ([]*entities.Project, error) {
	return a.repository.GetProjects(query)
}

func (a service) GetProjectsByUserID(uid string, isOwner bool) ([]*entities.Project, error) {
	return a.repository.GetProjectsByUserID(uid, isOwner)
}

func (a service) CreateProject(project *entities.Project) error {
	return a.repository.CreateProject(project)
}

func (a service) AddMember(projectID string, member *entities.Member) error {
	return a.repository.AddMember(projectID, member)
}

func (a service) RemoveInvitation(projectID string, userID string, invitation entities.Invitation) error {
	return a.repository.RemoveInvitation(projectID, userID, invitation)
}

func (a service) UpdateInvite(projectID string, userID string, invitation entities.Invitation, role *entities.MemberRole) error {
	return a.repository.UpdateInvite(projectID, userID, invitation, role)
}

func (a service) UpdateProjectName(projectID string, projectName string) error {
	return a.repository.UpdateProjectName(projectID, projectName)
}

func (a service) GetAggregateProjects(pipeline mongo.Pipeline, opts *options.AggregateOptions) (*mongo.Cursor, error) {
	return a.repository.GetAggregateProjects(pipeline, opts)
}

// NewService creates a new instance of this service
func NewService(r Repository) Service {
	return &service{
		repository: r,
	}
}
