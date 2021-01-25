from loguru import logger

class RequestMiddleware(object):

    def __init__(self, get_response):
        self.get_response = get_response
        # One-time configuration and initialization.

    def __call__(self, request):
        """ The order is 3 """

        response = self.get_response(request)

        print("RESPONSE", response)

        return response
    
    def process_view(self, request, view_func, view_args, view_kwargs):
        """ The order is 1 """
        print("REQUEST OBJECT IN PROCESS_VIEW", request)

    def process_exception(self, request, exception):
        print("REQUEST in PROCESS TEMPLATE", request)
        return request

    def process_template_response(self, request, response):
        """ The order is 2 """

        print("Response in PROCESS TEMPLATE", response)
        print("REQUEST in PROCESS TEMPLATE", request)
        return response


# logger.add("file_{time}.log", format="{time:YYYY-MM-DD at HH:mm:ss} | {level} | {message} ", level="INFO", rotation="500 MB")
# serialize = True