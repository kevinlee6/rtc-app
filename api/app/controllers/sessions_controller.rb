class SessionsController < ApiController
  skip_before_action :require_login, only: [:create], raise: false

  def create
    # username = params[:user][:username]
    # password = params[:user][:password]
    # if User.valid_login?(username, password)
    #   user = User.find_by(username: username)
    #   allow_token_to_be_used_only_once_for(user)
    #   send_auth_token_for_valid_login_of(user)
    # else
    #   render_unauthorized('Error with your login or password')
    # end
    username = params[:user][:username]
    password = params[:user][:password]
    if user = User.valid_login?(username, password)
      allow_token_to_be_used_only_once_for(user)
      send_auth_token_for_valid_login_of(user)
    else
      render_unauthorized("Error with your login or password")
    end
  end

  def destroy
    logout
    head :ok
  end

  private

  def send_auth_token_for_valid_login_of(user)
    render json: { token: user.token }
  end

  def allow_token_to_be_used_only_once_for(user)
    user.regenerate_token
  end

  def logout
    current_user.invalidate_token
  end
end