# frozen_string_literal: true

class UsersController < ApiController
  before_action :require_login, except: [:create]

  # GET /users
  def index
    @users = User.all

    render json: @users
  end

  # GET /users/1
  def show
    render json: @user
  end

  # POST /users
  def create
    user = User.create!(user_params)
    render json: { token: user.token }
  end

  def settings
    user = User.find_by_token!(request.headers[:token])
    render json:
    {
      user: {
        username: user.username,
        email: user.email
      }
    }
  end

  # PATCH/PUT /users/1
  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    @user.destroy
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_user
    @user = User.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def user_params
    params.require(:user).permit(:username, :email, :password)
  end
end
