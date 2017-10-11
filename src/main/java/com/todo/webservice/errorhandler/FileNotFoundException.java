package com.todo.webservice.errorhandler;
public class FileNotFoundException extends Exception{

    /**
     * 
     */
    private static final long serialVersionUID = 1L;
    
    private String errorMessage;
    
    public FileNotFoundException(String errorMessage){
	this.errorMessage = errorMessage;
    }
    
    public FileNotFoundException(){
	
	this.errorMessage = "No account number found!";
    }
    
    /**
	 * @return the errorMessage
	 */
	public String getErrorMessage() {
		return errorMessage;
	}

}