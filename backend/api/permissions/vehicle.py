from rest_framework import permissions


class VehiclePermissions(permissions.BasePermission):
    """Used by Viewset to check permissions for API requests"""

    def has_permission(self, request, view):
        """Check permissions When an object does not yet exist (POST)"""
        # Fallback to has_object_permission unless it's a POST
        if request.method != 'POST':
            return True

        if request.user.is_government:
            return request.user.has_perm('REQUEST_ZEV_CHANGES') or \
                request.user.has_perm('VALIDATE_ZEV')

        return request.user.has_perm('CREATE_ZEV') or \
            request.user.has_perm('SUBMIT_ZEV') or \
            request.user.has_perm('EDIT_ZEV')

    def has_object_permission(self, request, view, obj):
        """Check permissions When an object does exist (PUT, GET)"""
        if request.user.has_perm('REQUEST_ZEV_CHANGES') or \
                request.user.has_perm('VALIDATE_ZEV'):
            return True

        if obj.organization_id == request.user.organization_id:
            if request.method in permissions.SAFE_METHODS:
                return True

            if request.user.has_perm('CREATE_ZEV') or \
                    request.user.has_perm('SUBMIT_ZEV') or \
                    request.user.has_perm('EDIT_ZEV'):
                return True

        if request.method == 'GET' and \
                request.user.has_perm('VIEW_ZEV'):
            return True

        return False
