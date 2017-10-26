class SessionsController < ApplicationController

	def new
  end

  def create
    user = User.find_by_email(params[:email])
    if user && user.authenticate(params[:password])
      session[:user_id] = user.id
      redirect_to '/dashboard'
    else
    	flash[:failure] = "Login failed. User not found"
      redirect_to '/login'
    end
  end

  def destroy
    session[:user_id] = nil
    flash[:failure] = "Logged out successfully"
    redirect_to '/login'
  end

end