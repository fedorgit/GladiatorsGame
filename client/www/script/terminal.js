

const Terminal = {

    route(data) {

        const status = data.clientStatusEnumId;

        switch(status) {

            case StatusUserEnum.NONE: {

                return false;
            }

            case StatusUserEnum.CONNECT: {


                


                return true;
            }

            case StatusUserEnum.SELECT_ACTION: {


                return true;
            }

            case StatusUserEnum.CREATE_ROOM: {


                return true;
            }

            case StatusUserEnum.SELECT_ROOM: {


                return true;
            }


        }
    }

}